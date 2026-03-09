const PhieuMuon = require('../models/PhieuMuon');
const db = require('../config/db');

exports.returnBook = async (req, res) => {

    try {
        const { maVach } = req.body;

        // tìm phiếu mượn đang mượn
        const phieuMuon = await PhieuMuon.findDangMuonByMaVach(maVach);

        if (!phieuMuon) {
            return res.json({ message: "Không tìm thấy phiếu mượn" });
        }

        const hanTra = new Date(phieuMuon.hanTra);
        const today = new Date();

        let soNgayTre = 0;
        let tienPhat = 0;

        if (today > hanTra) {
            soNgayTre = Math.ceil((today - hanTra) / (1000 * 60 * 60 * 24));
            tienPhat = soNgayTre * 5000;
        }

        // cập nhật phiếu mượn
        await PhieuMuon.traSach(phieuMuon.id);

        // cập nhật trạng thái sách
        await db.query(
            "UPDATE BanSaoSach SET trangThai='CO_SAN' WHERE maVach=?",
            [maVach]
        );

        res.json({
            message: "Trả sách thành công",
            soNgayTre,
            tienPhat
        });

    } catch (error) {
        res.status(500).json(error);
    }
};