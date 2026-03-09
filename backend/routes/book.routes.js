const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const upload = require("../middleware/uploadBook");

router.post("/books", upload.single("anhBia"), bookController.addBook);

router.put("/books/:id", bookController.updateBook);

router.delete("/books/:id", bookController.deleteBook);

router.get('/dausach', bookController.getAllBooks);

module.exports = router;