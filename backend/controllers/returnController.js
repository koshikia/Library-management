const db = require('../config/db');
const PhieuMuon = require('../models/PhieuMuon');
const BanSaoSach = require('../models/BanSaoSach');

exports.returnBook = async (req, res) => {

    const { phieuMuonId } = req.body;

    const conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        const phieuMuon = await PhieuMuon.findById(phieuMuonId);

        if (!phieuMuon) {
            return res.status(404).json({
                error: "Không tìm thấy phiếu mượn"
            });
        }

        if (phieuMuon.trangThai === 'DA_TRA') {
            return res.status(400).json({
                error: "Sách đã được trả"
            });
        }

        // cập nhật phiếu mượn
        await PhieuMuon.traSach(phieuMuonId);

        // cập nhật sách
        await BanSaoSach.updateTrangThai(phieuMuon.maVach, 'CO_SAN');

        await conn.commit();

        res.json({
            message: "Trả sách thành công"
        });

    } catch (error) {

        await conn.rollback();

        res.status(500).json({
            error: "Lỗi server"
        });

    } finally {

        conn.release();

    }

};