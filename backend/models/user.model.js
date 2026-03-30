const db = require('../config/db');

// ============================
// TẠO USER
// ============================
exports.createUser = async (hoTen, email, matKhau) => {

    const [result] = await db.query(
        `INSERT INTO NguoiDung (hoTen, email, matKhau)
         VALUES (?, ?, ?)`,
        [hoTen, email, matKhau]
    );

    return result;
};


// ============================
// TÌM USER THEO EMAIL
// ============================
exports.findByEmail = async (email) => {

    const [rows] = await db.query(
        "SELECT * FROM NguoiDung WHERE email = ?",
        [email]
    );

    return rows;
};


// ============================
// LẤY TẤT CẢ USER
// ============================
exports.getAllUsers = async () => {

    const [rows] = await db.query(
        "SELECT * FROM NguoiDung"
    );

    return rows;
};


// ============================
// THÊM USER
// ============================
exports.addUser = async (data) => {

    const [result] = await db.query(
        `INSERT INTO NguoiDung
        (hoTen, email, matKhau, vaiTro)
        VALUES (?, ?, ?, ?)`,
        [
            data.hoTen,
            data.email,
            data.matKhau,
            data.vaiTro
        ]
    );

    return result;
};


// ============================
// UPDATE USER
// ============================
exports.updateUser = async (id, data) => {

    const [result] = await db.query(
        `UPDATE NguoiDung
         SET hoTen=?, email=?, vaiTro=?
         WHERE id=?`,
        [
            data.hoTen,
            data.email,
            data.vaiTro,
            id
        ]
    );

    return result;
};


// ============================
// DELETE USER
// ============================
exports.deleteUser = async (id) => {

    const [result] = await db.query(
        "DELETE FROM NguoiDung WHERE id=?",
        [id]
    );

    return result;
};

// ============================
// CẬP NHẬT TRẠNG THÁI (KHÓA/MỞ KHÓA)
// ============================
exports.updateStatus = async (id, trangThai) => {
    const [result] = await db.query(
        "UPDATE NguoiDung SET trangThai = ? WHERE id = ?",
        [trangThai, id]
    );
    return result;
};