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
exports.updateBook = (req, res) => {

    const id = req.params.id

    const tenSach = req.body.tenSach
    const tacGia = req.body.tacGia
    const theLoai = req.body.theLoai
    const nhaXuatBan = req.body.nhaXuatBan
    const namXuatBan = req.body.namXuatBan
    const tongSoLuong = req.body.tongSoLuong
    const moTa = req.body.moTa

    let anhBia = null

    if(req.file){
        anhBia = req.file.filename
    }

    const sql = `
        UPDATE DauSach 
        SET tenSach=?, tacGia=?, theLoai=?, nhaXuatBan=?, namXuatBan=?, tongSoLuong=?, moTa=?, anhBia=?
        WHERE maDauSach=?
    `

    db.query(sql,[
        tenSach,
        tacGia,
        theLoai,
        nhaXuatBan,
        namXuatBan,
        tongSoLuong,
        moTa,
        anhBia,
        id
    ],(err,result)=>{

        if(err){
            return res.status(500).json(err)
        }

        res.json({
            message:"Cập nhật sách thành công"
        })

    })

}
exports.deleteBook = (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM DauSach WHERE maDauSach=?";

    db.query(sql,[id],(err)=>{

        if(err){
            return res.status(500).json({message:"Lỗi xoá"});
        }

        res.json({message:"Đã xoá sách"});
    });

};