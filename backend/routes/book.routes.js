const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.get('/dausach', bookController.getAllBooks);

module.exports = router;