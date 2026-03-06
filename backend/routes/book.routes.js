const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const uploadBook = require("../middleware/uploadBook");

router.get('/dausach', bookController.getAllBooks);

router.post(
    "/uploadBook",
    uploadBook.single("anhBia"),
    bookController.uploadBook
);

module.exports = router;