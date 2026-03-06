const bookModel = require('../models/book.model');

exports.getAllBooks = (req, res) => {
    bookModel.getAllBooks((err, result) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi truy vấn CSDL" });
        }
        res.json(result);
    });
};