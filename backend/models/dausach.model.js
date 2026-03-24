const db = require('../config/db');

class DauSachModel {
    static getAll() {
<<<<<<< HEAD
        return db.query('SELECT * FROM DauSach');
=======
        // Lấy toàn bộ thông tin gốc (có sẵn ds.tongSoLuong) 
        // VÀ đếm thêm số bản sao đang rảnh (gán vào biến soLuongCoSan)
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
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
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