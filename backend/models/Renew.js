const db = require('../config/db');

const Renew = {
    // 1. Tạo yêu cầu gia hạn
    createRequest: async (phieuMuonId, soNgayGiaHan, lyDo) => {
        const [result] = await db.query(
            `INSERT INTO GiaHan (phieuMuonId, soNgayGiaHan, lyDo) VALUES (?, ?, ?)`,
            [phieuMuonId, soNgayGiaHan, lyDo]
        );
        return result;
    },

    // 2. Kiểm tra đã có yêu cầu gia hạn CHỜ DUYỆT chưa
    findPendingByPhieuMuonId: async (phieuMuonId) => {
        const [rows] = await db.query(
            `SELECT * FROM GiaHan WHERE phieuMuonId = ? AND trangThai = 'CHO_DUYET'`,
            [phieuMuonId]
        );
        return rows[0];
    },

    // --- CÁC HÀM KIỂM TRA ĐIỀU KIỆN GIA HẠN (MỚI) ---
    
    // Kiểm tra xem phiếu mượn này đã từng được gia hạn thành công chưa (Max 1 lần)
    checkAlreadyRenewed: async (phieuMuonId) => {
        const [rows] = await db.query(
            `SELECT id FROM GiaHan WHERE phieuMuonId = ? AND trangThai = 'DA_DUYET'`, 
            [phieuMuonId]
        );
        return rows.length > 0;
    },

    // Kiểm tra sách đã quá hạn chưa (Quá hạn thì cấm gia hạn)
    checkOverdue: async (phieuMuonId) => {
        const [rows] = await db.query(
            `SELECT id FROM PhieuMuon WHERE id = ? AND (trangThai = 'QUA_HAN' OR hanTra < NOW())`, 
            [phieuMuonId]
        );
        return rows.length > 0;
    },

    // Kiểm tra sách có đang bị người khác đặt trước không
    checkReserved: async (phieuMuonId) => {
        const [rows] = await db.query(`
            SELECT dt.id
            FROM PhieuMuon pm
            JOIN BanSaoSach bs ON pm.maVach = bs.maVach
            JOIN DatTruoc dt ON bs.maDauSach = dt.maDauSach
            WHERE pm.id = ? AND dt.trangThai = 'CHO'
        `, [phieuMuonId]);
        return rows.length > 0;
    },

    // -----------------------------------------------

    // 3. Tìm yêu cầu theo id
    findById: async (giaHanId) => {
        const [rows] = await db.query(`SELECT * FROM GiaHan WHERE id = ?`, [giaHanId]);
        return rows[0];
    },

    // 4. Danh sách yêu cầu chờ duyệt (Dành cho Thủ thư)
    getPendingRequests: async () => {
        const [rows] = await db.query(`
            SELECT 
                gh.id, gh.phieuMuonId, gh.soNgayGiaHan, gh.lyDo, gh.ngayYeuCau,
                nd.hoTen, ds.tenSach, pm.hanTra
            FROM GiaHan gh
            JOIN PhieuMuon pm ON gh.phieuMuonId = pm.id
            JOIN NguoiDung nd ON pm.nguoiDungId = nd.id
            JOIN BanSaoSach bs ON pm.maVach = bs.maVach
            JOIN DauSach ds ON bs.maDauSach = ds.maDauSach
            WHERE gh.trangThai = 'CHO_DUYET'
            ORDER BY gh.ngayYeuCau ASC
        `);
        return rows;
    },

    // 5. Duyệt yêu cầu (LƯU Ý: Nhận thêm biến connection để chạy Transaction)
    approve: async (giaHanId, connection = db) => {
        return connection.query(`UPDATE GiaHan SET trangThai = 'DA_DUYET' WHERE id = ?`, [giaHanId]);
    },

    // 6. Cộng thêm ngày vào phiếu mượn (LƯU Ý: Nhận thêm biến connection)
    extendDueDate: async (phieuMuonId, soNgay, connection = db) => {
        return connection.query(`UPDATE PhieuMuon SET hanTra = DATE_ADD(hanTra, INTERVAL ? DAY) WHERE id = ?`, [soNgay, phieuMuonId]);
    },

    // 7. Từ chối yêu cầu (Ghi vào cột lyDoTuChoi)
    reject: async (giaHanId, lyDoTuChoi) => {
        return db.query(`UPDATE GiaHan SET trangThai = 'TU_CHOI', lyDoTuChoi = ? WHERE id = ?`, [lyDoTuChoi, giaHanId]);
    }
};

module.exports = Renew;