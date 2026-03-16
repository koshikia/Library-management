const db = require('../config/db');
const Renew = require('../models/Renew');

// Độc giả gửi yêu cầu gia hạn
exports.requestRenewal = async (req, res) => {
    const { phieuMuonId, lyDo } = req.body;
    const nguoiDungId = req.session.user?.id;

    if (!nguoiDungId) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    try {
        // CHỐT 1: Đã có yêu cầu đang chờ chưa?
        const exist = await Renew.findPendingByPhieuMuonId(phieuMuonId);
        if (exist) {
            return res.status(400).json({ message: "Bạn đã gửi yêu cầu gia hạn cho cuốn này và đang chờ thủ thư duyệt." });
        }

        // CHỐT 2: Đã gia hạn lần nào chưa? (Max 1 lần)
        const daGiaHan = await Renew.checkAlreadyRenewed(phieuMuonId);
        if (daGiaHan) {
            return res.status(400).json({ message: "Mỗi cuốn sách chỉ được gia hạn tối đa 1 lần." });
        }

        // CHỐT 3: Sách đã bị quá hạn chưa?
        const quaHan = await Renew.checkOverdue(phieuMuonId);
        if (quaHan) {
            return res.status(400).json({ message: "Sách đã quá hạn! Bạn không thể gia hạn mà phải mang sách đến thư viện để trả và nộp phạt." });
        }

        // CHỐT 4: Có ai đang xếp hàng đặt trước cuốn này không?
        const biDatTruoc = await Renew.checkReserved(phieuMuonId);
        if (biDatTruoc) {
            return res.status(400).json({ message: "Rất tiếc! Cuốn sách này đang có độc giả khác chờ mượn. Vui lòng trả sách đúng hạn." });
        }

        // Nếu qua hết các chốt, tạo yêu cầu! (Mặc định cộng 7 ngày)
        await Renew.createRequest(phieuMuonId, 7, lyDo || "Không có lý do");
        res.status(201).json({ message: "Gửi yêu cầu gia hạn thành công. Vui lòng chờ thủ thư duyệt!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi yêu cầu gia hạn." });
    }
};

// Thủ thư xem danh sách chờ
exports.getPendingRenewals = async (req, res) => {
    try {
        const data = await Renew.getPendingRequests();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// Thủ thư Duyệt gia hạn
exports.approveRenewal = async (req, res) => {
    const { giaHanId } = req.body;
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();
        const gh = await Renew.findById(giaHanId);

        if (!gh) throw new Error("Yêu cầu không tồn tại");
        if (gh.trangThai !== 'CHO_DUYET') throw new Error("Yêu cầu này đã được xử lý trước đó");

        // CHÚ Ý: Truyền conn vào để đảm bảo chạy trong Transaction
        await Renew.approve(giaHanId, conn);
        await Renew.extendDueDate(gh.phieuMuonId, gh.soNgayGiaHan, conn);

        await conn.commit();
        res.json({ message: "Gia hạn thành công! Ngày trả đã được cộng thêm." });

    } catch (error) {
        await conn.rollback();
        res.status(400).json({ message: error.message });
    } finally {
        conn.release();
    }
};

// Thủ thư Từ chối gia hạn
exports.rejectRenewal = async (req, res) => {
    const { giaHanId, lyDoTuChoi } = req.body; // Lấy lý do từ chối từ Frontend
    try {
        await Renew.reject(
            giaHanId,
            lyDoTuChoi || "Không đủ điều kiện gia hạn (Sách đang có người chờ hoặc lý do không hợp lệ)"
        );
        res.json({ message: "Đã từ chối yêu cầu gia hạn" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};