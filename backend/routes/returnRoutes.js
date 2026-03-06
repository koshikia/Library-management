const express = require('express');
const router = express.Router();

const returnController = require('../controllers/returnController');

// Trả sách
router.post('/return', returnController.returnBook);

module.exports = router;