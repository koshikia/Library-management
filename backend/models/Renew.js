const db = require('../config/db');

const Renew = {

    // tạo yêu cầu gia hạn
    createRequest: async (phieuMuonId, soNgayGiaHan, lyDo) => {

        const [result] = await db.query(
            `INSERT INTO GiaHan
             (phieuMuonId, soNgayGiaHan, lyDo)
             VALUES (?, ?, ?)`,
            [phieuMuonId, soNgayGiaHan, lyDo]
        );

        return result;
    },

    // kiểm tra đã có yêu cầu gia hạn chưa
    findPendingByPhieuMuonId: async (phieuMuonId) => {

        const [rows] = await db.query(
            `SELECT * FROM GiaHan
             WHERE phieuMuonId = ?
             AND trangThai = 'CHO_DUYET'`,
            [phieuMuonId]
        );

        return rows[0];
    },

    // tìm yêu cầu theo id
    findById: async (giaHanId) => {

        const [rows] = await db.query(
            `SELECT * FROM GiaHan
             WHERE id = ?`,
            [giaHanId]
        );

        return rows[0];
    },

    // danh sách yêu cầu chờ duyệt
    getPendingRequests: async () => {

        const [rows] = await db.query(`
            SELECT 
                gh.id,
                gh.phieuMuonId,
                gh.soNgayGiaHan,
                gh.lyDo,
                gh.ngayYeuCau,
                nd.hoTen,
                ds.tenSach
            FROM GiaHan gh
            JOIN PhieuMuon pm ON gh.phieuMuonId = pm.id
            JOIN NguoiDung nd ON pm.nguoiDungId = nd.id
            JOIN BanSaoSach bs ON pm.maVach = bs.maVach
            JOIN DauSach ds ON bs.maDauSach = ds.maDauSach
            WHERE gh.trangThai = 'CHO_DUYET'
            ORDER BY gh.ngayYeuCau DESC
        `);

        return rows;
    },

    // duyệt yêu cầu
    approve: async (giaHanId) => {

        return db.query(
            `UPDATE GiaHan
             SET trangThai = 'DA_DUYET'
             WHERE id = ?`,
            [giaHanId]
        );
    },

    // từ chối yêu cầu
    reject: async (giaHanId, lyDo) => {

        return db.query(
            `UPDATE GiaHan
             SET trangThai = 'TU_CHOI',
                 lyDo = ?
             WHERE id = ?`,
            [lyDo, giaHanId]
        );
    },

    // gia hạn ngày trả
    extendDueDate: async (phieuMuonId, soNgay) => {

        return db.query(
            `UPDATE PhieuMuon
             SET hanTra = DATE_ADD(hanTra, INTERVAL ? DAY)
             WHERE id = ?`,
            [soNgay, phieuMuonId]
        );
    }

};

module.exports = Renew;