const express = require('express');
const router = express.Router();

const borrowController = require('../controllers/borrowController');

const { 
    isAdmin,
    isThuThu,
    isLoggedIn 
} = require('../middleware/auth.middleware');


// ===============================
// TẠO PHIẾU MƯỢN (THỦ THƯ)
// ===============================
router.post(
    '/',
    isThuThu,
    borrowController.createBorrow
);


// ===============================
// THỦ THƯ / ADMIN XEM TẤT CẢ
// ===============================
router.get(
    '/all',
    isThuThu,
    borrowController.getAllBorrows
);


// ===============================
// ĐỘC GIẢ XEM PHIẾU MƯỢN CỦA MÌNH
// ===============================
router.get(
    '/my',
    isLoggedIn,
    borrowController.getMyBorrows
);


module.exports = router;