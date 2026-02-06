// backend/models/Borrow.js
const db = require('../config/db');

const Borrow = {
  // Kiểm tra số sách đang mượn của 1 người
  countActiveBorrows: async (userId) => {
    const [rows] = await db.query(
      "SELECT COUNT(*) as count FROM PhieuMuon WHERE nguoiDungId = ? AND trangThai = 'DANG_MUON'",
      [userId]
    );
    return rows[0].count;
  },

  // Kiểm tra xem đầu sách có ai đang đặt trước không
  checkReservation: async (maDauSach) => {
    const [rows] = await db.query(
      "SELECT * FROM DatTruoc WHERE maDauSach = ? AND trangThai = 'CHO' ORDER BY ngayDat ASC",
      [maDauSach]
    );
    return rows;
  },

  // ... Thêm các hàm tương tự cho Phạt, Trả, Gia hạn
};

module.exports = Borrow;