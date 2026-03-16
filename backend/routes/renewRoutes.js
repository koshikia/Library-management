const express = require('express');
const router = express.Router();

const renewController = require('../controllers/renewalController');
const { isThuThu } = require('../middleware/auth.middleware');

// bạn đọc gửi yêu cầu gia hạn
router.post('/', renewController.requestRenewal);

// thủ thư xem danh sách yêu cầu
router.get('/', isThuThu, renewController.getPendingRenewals);

// thủ thư duyệt gia hạn
router.post('/approve', isThuThu, renewController.approveRenewal);

// thủ thư từ chối gia hạn
router.post('/reject', isThuThu, renewController.rejectRenewal);

module.exports = router;