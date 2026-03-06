const userModel = require('../models/user.model');

// đăng ký
exports.register = (req, res) => {
    const { hoTen, email, matKhau } = req.body;

    if (!hoTen || !email || !matKhau) {
        return res.status(400).json({ message: "Thiếu thông tin" });
    }

    userModel.createUser(hoTen, email, matKhau, err => {
        if (err) {
            return res.status(500).json({ message: "Email đã tồn tại" });
        }
        res.json({ message: "Đăng ký thành công" });
    });
};

// đăng nhập
exports.login = (req, res) => {
    const { email, matKhau } = req.body;

    userModel.findByEmail(email, (err, result) => {
        if (err) return res.status(500).json({ message: "Lỗi server" });

        if (result.length === 0 || matKhau !== result[0].matKhau) {
            return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
        }

        const user = result[0];

        req.session.user = {
            id: user.id,
            hoTen: user.hoTen,
            vaiTro: user.vaiTro
        };

        res.json({
            message: "Đăng nhập thành công",
            vaiTro: user.vaiTro
        });
    });
};

// kiểm tra login
exports.me = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
    }
    res.json(req.session.user);
};

// logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};