const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const bcrypt = require("bcrypt")
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "frontend")));

//ROUTE HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "register.html"));
});

// TEST
app.get("/test", (req, res) => {
  res.send("SERVER OK");
});

// API book
app.get("/api/book", (req, res) => {
  db.query("SELECT * FROM book", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/book", (req, res) => {
  const { title, author, year } = req.body;
  db.query(
    "INSERT INTO book (title, author, year) VALUES (?, ?, ?)",
    [title, author, year],
    () => res.json({ message: "Thêm sách thành công" }),
  );
});

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});


//api đăng ký
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ họ tên, email và mật khẩu."
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email không hợp lệ."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu phải từ 8 ký tự trở lên."
      });
    }

    db.query(
      "SELECT id FROM NguoiDung WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Lỗi kiểm tra email:", err);
          return res.status(500).json({
            success: false,
            message: "Lỗi server khi kiểm tra email."
          });
        }

        if (results.length > 0) {
          return res.status(409).json({
            success: false,
            message: "Email đã tồn tại."
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = role || "DOCGIA";

        db.query(
          "INSERT INTO NguoiDung (hoTen, email, matKhau, vaiTro) VALUES (?, ?, ?, ?)",
          [fullname, email, hashedPassword, userRole],
          (err, result) => {
            if (err) {
              console.error("Lỗi thêm người dùng:", err);
              return res.status(500).json({
                success: false,
                message: "Không thể đăng ký tài khoản."
              });
            }

            return res.json({
              success: true,
              message: "Đăng ký thành công.",
              userId: result.insertId
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Lỗi register:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server."
    });
  }
});

//api đăng nhập

app.use(express.urlencoded({ extended: true }));

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ email và mật khẩu."
    });
  }

  db.query(
    "SELECT * FROM NguoiDung WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Lỗi server:", err);
        return res.status(500).json({
          success: false,
          message: "Lỗi server."
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Email không tồn tại."
        });
      }

      const user = results[0];

      try {
        const isMatch = await bcrypt.compare(password, user.matKhau);

        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: "Sai mật khẩu."
          });
        }

        return res.json({
          success: true,
          message: "Đăng nhập thành công.",
          vaiTro: user.vaiTro,
          user: {
            id: user.id,
            hoTen: user.hoTen,
            email: user.email
          }
        });
      } catch (error) {
        console.error("Lỗi bcrypt:", error);
        return res.status(500).json({
          success: false,
          message: "Lỗi xác thực mật khẩu."
        });
      }
    }
  );
});

