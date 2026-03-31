const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
exports.register = async (req, res) => {
    try {
        const { hoTen, email, matKhau } = req.body;
        if (!hoTen || !email || !matKhau) {
            return res.status(400).json({
                message: "Thiếu thông tin đăng ký"
            });
        }
        const existingUser = await userModel.findByEmail(email);
        if (existingUser.length) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            });
        }
        const hashedPassword = await bcrypt.hash(matKhau, 10);
        await userModel.createUser(hoTen, email, hashedPassword);
        res.json({
            message: "Đăng ký thành công"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, matKhau } = req.body;
        if (!email || !matKhau) {
            return res.status(400).json({
                message: "Thiếu email hoặc mật khẩu"
            });
        }
        const result = await userModel.findByEmail(email);
        if (!result.length) {
            return res.status(401).json({
                message: "Sai email hoặc mật khẩu"
            });
        }
        const user = result[0];
        const match = await bcrypt.compare(matKhau, user.matKhau);
        if (!match) {
            return res.status(401).json({
                message: "Sai email hoặc mật khẩu"
            });
        }
        req.session.user = {
            id: user.id,
            hoTen: user.hoTen,
            vaiTro: user.vaiTro
        };
        res.json({
            message: "Đăng nhập thành công",
            user: {
                id: user.id,
                hoTen: user.hoTen,
                vaiTro: user.vaiTro
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};
exports.me = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "Chưa đăng nhập"
        });
    }
    res.json(req.session.user);
};
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({
                message: "Không thể đăng xuất"
            });
        }
        res.json({
            message: "Đăng xuất thành công"
        });
    });
};