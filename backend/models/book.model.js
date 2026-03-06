const db = require('../config/db');

exports.getAllBooks = (callback) => {
    const sql = "SELECT * FROM DauSach";
    db.query(sql, callback);
};

exports.insertBook = (data, callback) => {

    const sql = `
        INSERT INTO DauSach
        (maDauSach, tenSach, tacGia, theLoai, nhaXuatBan, namXuatBan, moTa, tongSoLuong, anhBia)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.maDauSach,
        data.tenSach,
        data.tacGia,
        data.theLoai,
        data.nhaXuatBan,
        data.namXuatBan,
        data.moTa,
        data.tongSoLuong,
        data.anhBia
    ], callback);
};