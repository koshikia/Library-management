const db = require('../config/db');

exports.getAllBooks = (callback) => {
    const sql = "SELECT * FROM DauSach";
    db.query(sql, callback);
};

exports.addBook = (data, callback) => {
    const sql = `
    INSERT INTO DauSach
    (maDauSach, tenSach, tacGia, theLoai, nhaXuatBan, namXuatBan, moTa, tongSoLuong, anhBia)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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

exports.updateBook = (maDauSach, data, callback) => {
    const sql = `
    UPDATE DauSach SET
    tenSach=?,
    tacGia=?,
    theLoai=?,
    nhaXuatBan=?,
    namXuatBan=?,
    moTa=?,
    tongSoLuong=?,
    anhBia=?
    WHERE maDauSach=?`;

    db.query(sql, [
        data.tenSach,
        data.tacGia,
        data.theLoai,
        data.nhaXuatBan,
        data.namXuatBan,
        data.moTa,
        data.tongSoLuong,
        data.anhBia,
        maDauSach
    ], callback);
};

exports.deleteBook = (maDauSach, callback) => {
    db.query("DELETE FROM DauSach WHERE maDauSach=?", [maDauSach], callback);
};