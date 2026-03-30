const db = require('../config/db');

class DauSachModel {
    static getAll() {
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
    }

    static getById(maDauSach) {
        const sql = `
            SELECT
                ds.maDauSach,
                ds.tenSach,
                ds.tacGia,
                ds.theLoai,
                ds.nhaXuatBan,
                ds.namXuatBan,
                ds.moTa,
                ds.hinhAnh,
                ds.tongSoLuong,
                COUNT(bs.maVach) AS tongBanSaoThucTe,
                COALESCE(SUM(CASE WHEN bs.trangThai = 'CO_SAN' THEN 1 ELSE 0 END), 0) AS soLuongCoSan,
                COALESCE(SUM(CASE WHEN bs.trangThai = 'DANG_MUON' THEN 1 ELSE 0 END), 0) AS soLuongDangMuon,
                COALESCE(SUM(CASE WHEN bs.trangThai = 'DANG_GIU_CHO' THEN 1 ELSE 0 END), 0) AS soLuongDangGiuCho,
                COALESCE(SUM(CASE WHEN bs.trangThai = 'HU_HONG' THEN 1 ELSE 0 END), 0) AS soLuongHuHong,
                COALESCE(SUM(CASE WHEN bs.trangThai = 'MAT' THEN 1 ELSE 0 END), 0) AS soLuongThatLac
            FROM DauSach ds
            LEFT JOIN BanSaoSach bs ON bs.maDauSach = ds.maDauSach
            WHERE ds.maDauSach = ?
            GROUP BY
                ds.maDauSach,
                ds.tenSach,
                ds.tacGia,
                ds.theLoai,
                ds.nhaXuatBan,
                ds.namXuatBan,
                ds.moTa,
                ds.hinhAnh,
                ds.tongSoLuong
        `;

        return db.query(sql, [maDauSach]);
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
