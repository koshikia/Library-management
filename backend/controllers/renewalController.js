const db = require('../config/db');
const Renew = require('../models/Renew');


// bạn đọc gửi yêu cầu gia hạn
exports.requestRenewal = async (req, res) => {

    const { phieuMuonId, lyDo } = req.body;

    const nguoiDungId = req.session.user?.id;

    if (!nguoiDungId) {
        return res.status(401).json({
            message: "Chưa đăng nhập"
        });
    }

    try {

        const exist = await Renew.findPendingByPhieuMuonId(phieuMuonId);

        if (exist) {
            return res.status(400).json({
                message: "Đã có yêu cầu gia hạn đang chờ duyệt"
            });
        }

        await Renew.createRequest(phieuMuonId, 7, lyDo);

        res.status(201).json({
            message: "Gửi yêu cầu gia hạn thành công"
        });

    } catch (error) {

        res.status(500).json({
            message: "Lỗi server"
        });

    }
};


// thủ thư xem danh sách gia hạn
exports.getPendingRenewals = async (req, res) => {

    try {

        const data = await Renew.getPendingRequests();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: "Lỗi server"
        });

    }
};


// duyệt gia hạn
exports.approveRenewal = async (req, res) => {

    const { giaHanId } = req.body;

    const conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        const gh = await Renew.findById(giaHanId);

        if (!gh) {
            throw new Error("Yêu cầu không tồn tại");
        }

        await Renew.approve(giaHanId);

        await Renew.extendDueDate(
            gh.phieuMuonId,
            gh.soNgayGiaHan
        );

        await conn.commit();

        res.json({
            message: "Gia hạn thành công"
        });

    } catch (error) {

        await conn.rollback();

        res.status(400).json({
            message: error.message
        });

    } finally {

        conn.release();

    }
};


// từ chối gia hạn
exports.rejectRenewal = async (req, res) => {

    const { giaHanId, lyDo } = req.body;

    try {

        await Renew.reject(
            giaHanId,
            lyDo || "Không đủ điều kiện gia hạn"
        );

        res.json({
            message: "Đã từ chối yêu cầu gia hạn"
        });

    } catch (error) {

        res.status(500).json({
            message: "Lỗi server"
        });

    }
};