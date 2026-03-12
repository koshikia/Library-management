const db = require('../config/db');
const PhieuMuon = require('../models/PhieuMuon');

exports.returnBook = async (req, res) => {

    const { maVach } = req.body;

    if (!maVach) {
        return res.status(400).json({
            message: "Thiếu mã vạch sách"
        });
    }

    const conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        // tìm phiếu mượn đang mượn
        const phieuMuon = await PhieuMuon.findDangMuonByMaVach(maVach);

        if (!phieuMuon) {
            await conn.rollback();
            return res.status(404).json({
                message: "Không tìm thấy phiếu mượn đang mượn"
            });
        }

        const hanTra = new Date(phieuMuon.hanTra);
        const today = new Date();

        let soNgayTre = 0;
        let tienPhat = 0;

        if (today > hanTra) {
            soNgayTre = Math.ceil(
                (today - hanTra) / (1000 * 60 * 60 * 24)
            );
            tienPhat = soNgayTre * 5000;
        }

        // cập nhật phiếu mượn
        await conn.query(
            `UPDATE PhieuMuon
             SET trangThai='DA_TRA',
                 ngayTra=CURDATE()
             WHERE id=?`,
            [phieuMuon.id]
        );

        // cập nhật trạng thái sách
        await conn.query(
            `UPDATE BanSaoSach
             SET trangThai='CO_SAN'
             WHERE maVach=?`,
            [maVach]
        );

        await conn.commit();

        res.json({
            message: "Trả sách thành công",
            soNgayTre,
            tienPhat
        });

    } catch (error) {

        await conn.rollback();

        res.status(500).json({
            message: "Lỗi server"
        });

    } finally {
        conn.release();
    }
};