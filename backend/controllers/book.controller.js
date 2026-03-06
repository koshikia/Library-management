const bookModel = require('../models/book.model');

exports.getAllBooks = (req, res) => {
    bookModel.getAllBooks((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi truy vấn CSDL" });
        }
        res.json(result);
    });
};

exports.uploadBook = (req, res) => {

    const {
        maDauSach,
        tenSach,
        tacGia,
        theLoai,
        nhaXuatBan,
        namXuatBan,
        moTa,
        tongSoLuong
    } = req.body;

    // đường dẫn lưu vào database
    const anhBia = "/pics/books/" + req.file.filename;

    const sql = `
        INSERT INTO DauSach
        (maDauSach, tenSach, tacGia, theLoai, nhaXuatBan, namXuatBan, moTa, tongSoLuong, anhBia)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        maDauSach,
        tenSach,
        tacGia,
        theLoai,
        nhaXuatBan,
        namXuatBan,
        moTa,
        tongSoLuong,
        anhBia
    ], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Thêm sách thành công",
            anhBia: anhBia
        });
    });
};