const express = require('express');
const router = express.Router();
const { isThuThu } = require('../middleware/auth.middleware');
const reportController = require('../controllers/reportController');

router.get('/',isThuThu, reportController.getDashboardStats);
module.exports = router;