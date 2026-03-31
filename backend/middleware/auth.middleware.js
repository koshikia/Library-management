exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập"
        });
    }
    next();
};
exports.isAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập"
        });
    }
    if (req.session.user.vaiTro !== "ADMIN") {
        return res.status(403).json({
            message: "Bạn không có quyền admin"
        });
    }
    next();
};
exports.isThuThu = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập"
        });
    }
    if (req.session.user.vaiTro !== "THUTHU") {
        return res.status(403).json({
            message: "Bạn không có quyền thủ thư"
        });
    }
    next();
};