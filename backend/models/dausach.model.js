const db = require('../config/db');

class DauSachModel {
    static getAll() {
        const sql = `
            SELECT ds.*, 
                   (SELECT COUNT(*) 
                    FROM BanSaoSach bs 
                    WHERE bs.maDauSach = ds.maDauSach 
                    AND bs.trangThai = 'CO_SAN') AS soLuongCoSan
            FROM DauSach ds
            ORDER BY ds.maDauSach DESC
        `;
        return db.query(sql);
    }

    static getById(maDauSach) {
        return db.query('SELECT * FROM DauSach WHERE maDauSach = ?', [maDauSach]);
    }

    static create(data) {
        const sql = `INSERT INTO DauSach (maDauSach, tenSach, tacGia, theLoai, nhaXuatBan, namXuatBan, moTa, hinhAnh, tongSoLuong) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`;
        return db.query(sql, [data.maDauSach, data.tenSach, data.tacGia, data.theLoai, data.nhaXuatBan, data.namXuatBan, data.moTa, data.hinhAnh]);
    }

    static update(id, data) {
        const sql = `UPDATE DauSach SET tenSach = ?, tacGia = ?, theLoai = ?, nhaXuatBan = ?, namXuatBan = ?, moTa = ?, hinhAnh = ? WHERE maDauSach = ?`;
        return db.query(sql, [data.tenSach, data.tacGia, data.theLoai, data.nhaXuatBan, data.namXuatBan, data.moTa, data.hinhAnh, id]);
    }

    static delete(id) {
        return db.query('DELETE FROM DauSach WHERE maDauSach = ?', [id]);
    }

    static updateQuantity(maDauSach, change) {
        const sql = 'UPDATE DauSach SET tongSoLuong = GREATEST(tongSoLuong + ?, 0) WHERE maDauSach = ?';
        return db.query(sql, [change, maDauSach]);
    }
}

module.exports = DauSachModel;