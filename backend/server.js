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
  res.sendFile(path.join(__dirname, "..", "frontend","user", "register.html"));
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



app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let users = [
  { id: 1, hoTen: "Nguyễn Văn A", email: "a@gmail.com", vaiTro: "ADMIN" },
  { id: 2, hoTen: "Trần Thị B", email: "b@gmail.com", vaiTro: "THUTHU" },
  { id: 3, hoTen: "Lê Văn C", email: "c@gmail.com", vaiTro: "DOCGIA" }
];

let books = [
  { id: 1, tenSach: "Dế Mèn Phiêu Lưu Ký", tacGia: "Tô Hoài", theLoai: "Văn học", soLuong: 10 },
  { id: 2, tenSach: "Node.js Cơ Bản", tacGia: "Nguyễn Dev", theLoai: "CNTT", soLuong: 5 }
];

let loans = [
  { id: 1, docGia: "Lê Văn C", tenSach: "Dế Mèn Phiêu Lưu Ký", ngayMuon: "2026-03-10", hanTra: "2026-03-20", trangThai: "DANG_MUON" }
];

app.get("/", (req, res) => {
  res.redirect("/admin-users.html");
});

/* USERS */
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const { hoTen, email, matKhau, vaiTro } = req.body;
  const newUser = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    hoTen,
    email,
    vaiTro
  };
  users.push(newUser);
  res.json({ message: "Thêm người dùng thành công", user: newUser });
});

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }

  users[index] = { ...users[index], ...req.body };
  res.json({ message: "Cập nhật người dùng thành công" });
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "Xóa người dùng thành công" });
});

/* BOOKS */
app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const { tenSach, tacGia, theLoai, soLuong } = req.body;
  const newBook = {
    id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
    tenSach,
    tacGia,
    theLoai,
    soLuong
  };
  books.push(newBook);
  res.json({ message: "Thêm sách thành công", book: newBook });
});

app.put("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Không tìm thấy sách" });
  }

  books[index] = { ...books[index], ...req.body };
  res.json({ message: "Cập nhật sách thành công" });
});

app.delete("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: "Xóa sách thành công" });
});

/* LOANS */
app.get("/api/loans", (req, res) => {
  res.json(loans);
});

app.post("/api/loans", (req, res) => {
  const { docGia, tenSach, ngayMuon, hanTra } = req.body;
  const newLoan = {
    id: loans.length ? Math.max(...loans.map(l => l.id)) + 1 : 1,
    docGia,
    tenSach,
    ngayMuon,
    hanTra,
    trangThai: "DANG_MUON"
  };
  loans.push(newLoan);
  res.json({ message: "Tạo phiếu mượn thành công", loan: newLoan });
});

app.put("/api/loans/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = loans.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Không tìm thấy phiếu mượn" });
  }

  loans[index] = { ...loans[index], ...req.body };
  res.json({ message: "Cập nhật phiếu mượn thành công" });
});

app.delete("/api/loans/:id", (req, res) => {
  const id = Number(req.params.id);
  loans = loans.filter(l => l.id !== id);
  res.json({ message: "Xóa phiếu mượn thành công" });
});

