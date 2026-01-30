const db = require('../db');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    const { email, matKhau } = req.body;

    if (!email || !matKhau) {
        return res.status(400).json({
            message: 'Thiếu email hoặc mật khẩu'
        });
    }

    // Lấy user theo email
    const sql = `
        SELECT id, hoTen, email, matKhau, vaiTro
        FROM nguoidung
        WHERE email = ?
    `;

    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        const user = results[0];

        // So sánh mật khẩu (KHÔNG JWT)
        const isMatch = await bcrypt.compare(matKhau, user.matKhau);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Đăng nhập thành công
        res.json({
            message: '✅ Đăng nhập thành công',
            user: {
                id: user.id,
                hoTen: user.hoTen,
                email: user.email,
                vaiTro: user.vaiTro
            }
        });
    });
};
