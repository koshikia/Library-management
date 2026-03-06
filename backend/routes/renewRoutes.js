const express = require('express');
const router = express.Router();

const renewController = require('../controllers/renewalController');

// Bạn đọc gửi yêu cầu gia hạn
router.post('/request', renewController.requestRenewal);

// Thủ thư duyệt yêu cầu gia hạn
router.post('/approve', renewController.approveRenewal);

// Thủ thư từ chối yêu cầu gia hạn
router.post('/reject', renewController.rejectRenew);

module.exports = router;