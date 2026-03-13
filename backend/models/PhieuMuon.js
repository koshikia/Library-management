const db = require('../config/db');

const PhieuMuon = {

    // Lấy phiếu mượn theo ID
    findById: async (id) => {
        const [rows] = await db.query(
            `SELECT * 
             FROM PhieuMuon 
             WHERE id = ?
             LIMIT 1`,
            [id]
        );

        return rows[0] || null;
    },

    // Tìm phiếu mượn đang mượn theo mã vạch
    findDangMuonByMaVach: async (maVach) => {

        const [rows] = await db.query(
            `SELECT *
             FROM PhieuMuon
             WHERE maVach = ?
             AND trangThai = 'DANG_MUON'
             LIMIT 1`,
            [maVach]
        );

        return rows[0] || null;
    },

    // Cập nhật trả sách
    traSach: async (id) => {

        const [result] = await db.query(
            `UPDATE PhieuMuon
             SET trangThai = 'DA_TRA',
                 ngayTra = CURDATE()
             WHERE id = ?
             AND trangThai = 'DANG_MUON'`,
            [id]
        );

        return result;
    },

    // Thủ thư xem tất cả phiếu mượn + trạng thái gia hạn
getAll: async () => {

    const [rows] = await db.query(`
        SELECT 
            pm.id,
            nd.hoTen,
            nd.email,
            ds.tenSach,
            bs.maVach,
            pm.ngayMuon,
            pm.hanTra,
            pm.ngayTra,
            pm.trangThai,

            gh.id AS giaHanId,
            gh.trangThai AS trangThaiGiaHan,
            gh.soNgayGiaHan

        FROM PhieuMuon pm

        JOIN NguoiDung nd 
            ON pm.nguoiDungId = nd.id

        JOIN BanSaoSach bs 
            ON pm.maVach = bs.maVach

        JOIN DauSach ds 
            ON bs.maDauSach = ds.maDauSach

        LEFT JOIN GiaHan gh
            ON pm.id = gh.phieuMuonId
            AND gh.trangThai = 'CHO_DUYET'

        ORDER BY pm.ngayMuon DESC
    `);

    return rows;
},
    

    // Bạn đọc xem phiếu mượn của mình
    getByUserId: async (userId) => {

        const [rows] = await db.query(`
            SELECT 
                pm.id,
                ds.tenSach,
                pm.maVach,
                pm.ngayMuon,
                pm.hanTra,
                pm.ngayTra,
                pm.trangThai
            FROM PhieuMuon pm
            JOIN BanSaoSach bs 
                ON pm.maVach = bs.maVach
            JOIN DauSach ds 
                ON bs.maDauSach = ds.maDauSach
            WHERE pm.nguoiDungId = ?
            ORDER BY pm.ngayMuon DESC
        `, [userId]);

        return rows;
    }

};

module.exports = PhieuMuon;