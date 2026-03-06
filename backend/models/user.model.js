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