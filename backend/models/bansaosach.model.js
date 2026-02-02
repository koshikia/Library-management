const db = require('../config/db');

class BanSaoModel {
    static getByDauSachId(maDauSach) {
        return db.query('SELECT * FROM BanSaoSach WHERE maDauSach = ?', [maDauSach]);
    }

    static getById(maVach) {
        return db.query('SELECT * FROM BanSaoSach WHERE maVach = ?', [maVach]);
    }

    static create(data) {
        const sql = `INSERT INTO BanSaoSach (maVach, maDauSach, trangThai) VALUES (?, ?, ?)`;
        return db.query(sql, [data.maVach, data.maDauSach, data.trangThai || 'CO_SAN']);
    }

    static updateStatus(maVach, trangThai) {
        return db.query('UPDATE BanSaoSach SET trangThai = ? WHERE maVach = ?', [trangThai, maVach]);
    }

    static delete(maVach) {
        return db.query('DELETE FROM BanSaoSach WHERE maVach = ?', [maVach]);
    }
}

module.exports = BanSaoModel;