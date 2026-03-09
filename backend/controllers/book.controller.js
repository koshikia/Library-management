const bookModel = require('../models/book.model');
const db = require("../config/db");
exports.getAllBooks = (req, res) => {
    bookModel.getAllBooks((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi truy vấn CSDL" });
        }
        res.json(result);
    });
};

exports.addBook = (req, res) => {

    const data = {
        maDauSach: req.body.maDauSach,
        tenSach: req.body.tenSach,
        tacGia: req.body.tacGia,
        theLoai: req.body.theLoai,
        nhaXuatBan: req.body.nhaXuatBan,
        namXuatBan: req.body.namXuatBan,
        moTa: req.body.moTa,
        tongSoLuong: req.body.tongSoLuong,
        anhBia: req.file ? "/pics/books/" + req.file.filename : null
    };

    bookModel.addBook(data, (err) => {
        if (err) return res.status(500).json({ message: "Lỗi thêm sách" });

        res.json({ message: "Thêm sách thành công" });
    });
};


exports.updateBook = (req, res) => {

const maDauSach = req.params.id;

const {
tenSach,
tacGia,
theLoai,
nhaXuatBan,
namXuatBan,
moTa,
tongSoLuong
} = req.body;

const sql = `
UPDATE DauSach SET
tenSach=?,
tacGia=?,
theLoai=?,
nhaXuatBan=?,
namXuatBan=?,
moTa=?,
tongSoLuong=?
WHERE maDauSach=?`;

db.query(sql,[
tenSach,
tacGia,
theLoai,
nhaXuatBan,
namXuatBan,
moTa,
tongSoLuong,
maDauSach
],err=>{

if(err){
return res.status(500).json({message:"Lỗi cập nhật"});
}

res.json({message:"Cập nhật thành công"});

});

};

exports.deleteBook = (req, res) => {

    const maDauSach = req.params.id;

    bookModel.deleteBook(maDauSach, (err) => {
        if (err) return res.status(500).json({ message: "Lỗi xóa sách" });

        res.json({ message: "Xóa thành công" });
    });
};