// models/Renew.js
const db = require('../config/db');

const Renew = {

  // Bạn đọc gửi yêu cầu gia hạn
  createRequest: async (phieuMuonId, soNgayGiaHan, lyDo) => {
    return db.query(
      `INSERT INTO GiaHan (phieuMuonId, soNgayGiaHan, lyDo)
       VALUES (?, ?, ?)`,
      [phieuMuonId, soNgayGiaHan, lyDo]
    );
  },

  // Thủ thư xem danh sách chờ duyệt
  getPendingRequests: async () => {
    const [rows] = await db.query(
      `SELECT gh.*, pm.nguoiDungId
       FROM GiaHan gh
       JOIN PhieuMuon pm ON gh.phieuMuonId = pm.id
       WHERE gh.trangThai = 'CHO_DUYET'`
    );
    return rows;
  },

  // Duyệt gia hạn
  approve: async (giaHanId) => {
    return db.query(
      `UPDATE GiaHan SET trangThai = 'DA_DUYET' WHERE id = ?`,
      [giaHanId]
    );
  },

  // Cập nhật hạn trả
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
