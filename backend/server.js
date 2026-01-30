const express = require('express');
const session = require("express-session");
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    secret: "secret_key_library",
    resave: false,
    saveUninitialized: false
}));


// server
// trỏ tới thư mục frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

//API đăng ký
app.post("/api/register", (req, res) => {
    const { hoTen, email, matKhau } = req.body;

    if (!hoTen || !email || !matKhau) {
        return res.status(400).json({ message: "Thiếu thông tin" });
    }

    const sql = `
        INSERT INTO NguoiDung (hoTen, email, matKhau)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [hoTen, email, matKhau], err => {
        if (err) {
            return res.status(500).json({ message: "Email đã tồn tại" });
        }
        res.json({ message: "Đăng ký thành công" });
    });
});

//API đăng nhập
app.post("/api/login", (req, res) => {
    const { email, matKhau } = req.body;

    const sql = "SELECT * FROM NguoiDung WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi server" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
        }

        const user = result[0];

        if (matKhau !== user.matKhau) {
            return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
        }

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
});


// ktra login
app.get("/api/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
    }
    res.json(req.session.user);
});

// đăng xuất
app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log(" Server chạy: http://localhost:3000");
});
