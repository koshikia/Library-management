const db = require('../config/db');

class DauSachModel {
    static getAll() {
        return db.query('SELECT * FROM DauSach');
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

    // Hàm hỗ trợ tăng/giảm số lượng khi thêm/xóa bản sao
    static updateQuantity(maDauSach, change) {
        // change là +1 hoặc -1
        const sql = 'UPDATE DauSach SET tongSoLuong = GREATEST(tongSoLuong + ?, 0) WHERE maDauSach = ?';
        return db.query(sql, [change, maDauSach]);
    }
}

module.exports = DauSachModel;