const db = require('../config/db');

const PhieuMuon = {

    // Lấy phiếu mượn theo ID
    findById: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM PhieuMuon WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    // Cập nhật trạng thái trả sách
    traSach: async (id) => {
        return await db.query(
            `UPDATE PhieuMuon
             SET trangThai = 'DA_TRA',
                 ngayTra = CURDATE()
             WHERE id = ?`,
            [id]
        );
    }

};

module.exports = PhieuMuon;