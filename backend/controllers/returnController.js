const db = require('../config/db');
const PhieuMuon = require('../models/PhieuMuon');

// Ghi nhận trả sách (Thủ thư)
exports.returnBorrow = async (req, res) => {
    const { maVach } = req.body;

    if (!maVach) {
        return res.status(400).json({ message: "Thiếu mã vạch cuốn sách cần trả" });
    }

    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        // 1. Tìm xem cuốn sách này có đang được ai mượn không
        const [[phieuMuon]] = await conn.query(
            `SELECT id FROM PhieuMuon 
             WHERE maVach = ? AND trangThai = 'DANG_MUON' 
             LIMIT 1`,
            [maVach]
        );

        if (!phieuMuon) {
            throw new Error("Mã vạch này không có ai mượn, hoặc đã được trả trước đó rồi!");
        }

        // 2. Cập nhật phiếu mượn thành ĐÃ TRẢ
        // (Nếu nhóm bạn có thiết kế cột ngayTra trong CSDL thì có thể thêm: ngayTra = CURDATE() vào lệnh UPDATE này)
        await conn.query(
            `UPDATE PhieuMuon 
             SET trangThai = 'DA_TRA' 
             WHERE id = ?`,
            [phieuMuon.id]
        );

        // 3. Trả sách lại vào kho (Cập nhật thành CÓ SẴN)
        await conn.query(
            `UPDATE BanSaoSach 
             SET trangThai = 'CO_SAN' 
             WHERE maVach = ?`,
            [maVach]
        );

        await conn.commit();

        res.status(200).json({ message: "Ghi nhận trả sách thành công! Sách đã vào kho." });

    } catch (error) {
        await conn.rollback();
        res.status(400).json({ message: error.message });
    } finally {
        conn.release();
    }
};