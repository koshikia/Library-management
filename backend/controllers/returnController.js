const db = require('../config/db');

exports.returnBorrow = async (req, res) => {
    const { maVach } = req.body;

    if (!maVach) {
        return res.status(400).json({ message: "Thiếu mã vạch cuốn sách cần trả" });
    }

    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        // 1. Lấy phiếu mượn
        const [[phieuMuon]] = await conn.query(
            `SELECT id, hanTra 
             FROM PhieuMuon 
             WHERE maVach = ? AND trangThai = 'DANG_MUON'
             LIMIT 1`,
            [maVach]
        );

        if (!phieuMuon) {
            throw new Error("Mã vạch này không có ai mượn hoặc đã trả rồi!");
        }

        const today = new Date();
        const hanTra = new Date(phieuMuon.hanTra);

        let soNgayTre = 0;
        let tienPhat = 0;

        // 2. Kiểm tra quá hạn
        if (today > hanTra) {
            const diffTime = today - hanTra;
            soNgayTre = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const tienPhatMoiNgay = 5000;
            tienPhat = soNgayTre * tienPhatMoiNgay;
        }

        // 3. Cập nhật phiếu mượn
        await conn.query(
            `UPDATE PhieuMuon
             SET trangThai = 'DA_TRA',
                 ngayTra = CURDATE()
             WHERE id = ?`,
            [phieuMuon.id]
        );

        // 4. Cập nhật trạng thái sách
        await conn.query(
            `UPDATE BanSaoSach
             SET trangThai = 'CO_SAN'
             WHERE maVach = ?`,
            [maVach]
        );

        await conn.commit();

        res.status(200).json({
            message: "Trả sách thành công",
            soNgayTre,
            tienPhat
        });

    } catch (error) {
        await conn.rollback();
        res.status(400).json({ message: error.message });
    } finally {
        conn.release();
    }
};