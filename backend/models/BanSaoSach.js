const db = require('../config/db');

const BanSaoSach = {

    // Cập nhật trạng thái sách
    updateTrangThai: async (maVach, trangThai) => {
        return await db.query(
            `UPDATE BanSaoSach
             SET trangThai = ?
             WHERE maVach = ?`,
            [trangThai, maVach]
        );
    }

};

module.exports = BanSaoSach;