const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const uploadBook = require("../middleware/uploadBook");

router.get('/dausach', bookController.getAllBooks);

router.post("/uploadBook",uploadBook.single("anhBia"),bookController.uploadBook);

router.put("/updateBook/:id",uploadBook.single("anhBia"),bookController.updateBook);

router.delete("/deleteBook/:id", bookController.deleteBook);

module.exports = router;