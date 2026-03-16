const express = require('express');
const router = express.Router();

const returnController = require('../controllers/returnController');
const { isThuThu } = require('../middleware/auth.middleware');

// trả sách (thủ thư thực hiện)
router.put('/tra', isThuThu, returnController.returnBorrow);

module.exports = router;