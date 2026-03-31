const db = require('../config/db');
exports.createUser = async (hoTen, email, matKhau) => {
    const [result] = await db.query(
        `INSERT INTO NguoiDung (hoTen, email, matKhau)
         VALUES (?, ?, ?)`,
        [hoTen, email, matKhau]
    );
    return result;
};
exports.findByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM NguoiDung WHERE email = ?",
        [email]
    );
    return rows;
};
exports.getAllUsers = async () => {
    const [rows] = await db.query(
        "SELECT * FROM NguoiDung"
    );
    return rows;
};
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
exports.deleteUser = async (id) => {

    const [result] = await db.query(
        "DELETE FROM NguoiDung WHERE id=?",
        [id]
    );

    return result;
};