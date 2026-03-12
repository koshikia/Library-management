const db = require('../config/db');

exports.createUser = (hoTen, email, matKhau, callback) => {
    const sql = `
        INSERT INTO NguoiDung (hoTen, email, matKhau)
        VALUES (?, ?, ?)
    `;
    db.query(sql, [hoTen, email, matKhau], callback);
};

exports.findByEmail = (email, callback) => {
    const sql = "SELECT * FROM NguoiDung WHERE email = ?";
    db.query(sql, [email], callback);
};

// lấy tất cả user
exports.getAllUsers = (callback) => {
    db.query("SELECT * FROM NguoiDung", callback);
};

// thêm user
exports.addUser = (data, callback) => {

    const sql = `
    INSERT INTO NguoiDung
    (hoTen, email, matKhau, vaiTro)
    VALUES (?, ?, ?, ?)`;

    db.query(sql, [
        data.hoTen,
        data.email,
        data.matKhau,
        data.vaiTro
    ], callback);
};


// sửa user
exports.updateUser = (id, data, callback) => {

    const sql = `
    UPDATE NguoiDung
    SET hoTen=?, email=?, vaiTro=?
    WHERE id=?`;

    db.query(sql, [
        data.hoTen,
        data.email,
        data.vaiTro,
        id
    ], callback);
};


// xóa user
exports.deleteUser = (id, callback) => {

    db.query("DELETE FROM NguoiDung WHERE id=?", [id], callback);

};