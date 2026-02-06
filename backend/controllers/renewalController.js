const db = require('../config/db');
const Renew = require('../models/Renew');
//bạn đọc gửi yêu cầu gia hạn
exports.requestRenewal = async (req, res) => {
    const { phieuMuonId, lyDo } = req.body;
    const nguoiDungId = req.user.id;

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const [[pm]] = await conn.query(
            "SELECT * FROM PhieuMuon WHERE id = ? AND nguoiDungId = ? AND trangThai = 'DANG_MUON'",
            [phieuMuonId, nguoiDungId]
        );
        if (!pm) throw new Error("Phiếu mượn không hợp lệ.");

        const [[exist]] = await conn.query(
            "SELECT id FROM GiaHan WHERE phieuMuonId = ? AND trangThai = 'CHO_DUYET'",
            [phieuMuonId]
        );
        if (exist) throw new Error("Đã có yêu cầu đang chờ duyệt.");

        await conn.query(
            "INSERT INTO GiaHan (phieuMuonId, soNgayGiaHan, lyDo) VALUES (?, 7, ?)",
            [phieuMuonId, lyDo]
        );

        await conn.commit();
        res.status(201).json({ message: "Gửi yêu cầu gia hạn thành công." });

    } catch (err) {
        await conn.rollback();
        res.status(400).json({ error: err.message });
    } finally {
        conn.release();
    }
};


//thủ thư duyệt yêu cầu gia hạn

exports.approveRenewal = async (req, res) => {
    const { giaHanId } = req.body;
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        const [[gh]] = await conn.query(
            `SELECT gh.*, pm.id AS phieuMuonId
             FROM GiaHan gh
             JOIN PhieuMuon pm ON gh.phieuMuonId = pm.id
             WHERE gh.id = ? AND gh.trangThai = 'CHO_DUYET'`,
            [giaHanId]
        );
        if (!gh) throw new Error("Yêu cầu không tồn tại.");

        await conn.query(
            "UPDATE GiaHan SET trangThai = 'DA_DUYET' WHERE id = ?",
            [giaHanId]
        );

        await conn.query(
            "UPDATE PhieuMuon SET hanTra = DATE_ADD(hanTra, INTERVAL ? DAY) WHERE id = ?",
            [gh.soNgayGiaHan, gh.phieuMuonId]
        );

        await conn.commit();
        res.json({ message: "Gia hạn thành công." });

    } catch (err) {
        await conn.rollback();
        res.status(400).json({ error: err.message });
    } finally {
        conn.release();
    }
};

//thủ thư từ chối yêu cầu gia hạn

exports.rejectRenew = async (req, res) => {
    const { giaHanId, lyDo } = req.body;
    const conn = await db.getConnection();

    try {
        const [result] = await conn.query(
            `UPDATE GiaHan
             SET trangThai = 'TU_CHOI', lyDo = ?
             WHERE id = ? AND trangThai = 'CHO_DUYET'`,
            [lyDo || 'Không đủ điều kiện gia hạn', giaHanId]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                error: "Yêu cầu không hợp lệ hoặc đã được xử lý."
            });
        }

        res.json({ message: "Đã từ chối yêu cầu gia hạn" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
