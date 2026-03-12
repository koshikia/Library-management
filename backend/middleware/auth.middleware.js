exports.isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.vaiTro !== "ADMIN") {
        return res.redirect("/login.html");
    }
    next();
};
exports.isThuThu = (req, res, next) => {
    if (!req.session.user || req.session.user.vaiTro !== "THUTHU") {
        return res.redirect("/login.html");
    }
    next();
};