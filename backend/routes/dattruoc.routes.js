const express = require('express');
const router = express.Router();
const datTruocController = require('../controllers/dattruoc.controller');

// Tạm thời bỏ verifyToken để test
router.post('/', datTruocController.datTruocSach);

// Tạm thời bỏ checkThuThuOrAdmin để test
router.put('/:id/trangthai', datTruocController.capNhatDatTruoc);

module.exports = router;