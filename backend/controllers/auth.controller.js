const db = require('../db');

exports.login = (req, res) => {
    const { email, matKhau } = req.body;

    if (!email || !matKhau) {
        return res.status(400).json({
            message: 'Thiếu email hoặc mật khẩu'
        });
    }

    const sql = `
        SELECT id, hoTen, email, matKhau, vaiTro
        FROM NguoiDung
        WHERE email = ?
        LIMIT 1
    `;

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Lỗi SQL:', err);
            return res.status(500).json({ message: 'Lỗi server' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
        }

        const user = results[0];

        // ⚠️ TEST TRƯỚC: so sánh mật khẩu thường
        if (user.matKhau !== matKhau) {
            return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
        }

        res.status(200).json({
            message: 'Đăng nhập thành công',
            user: {
                id: user.id,
                hoTen: user.hoTen,
                email: user.email,
                vaiTro: user.vaiTro
            }
        });
    });
};
