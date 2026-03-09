const express = require('express');
const router = express.Router();
const datTruocController = require('../controllers/dattruoc.controller');

// Tạm thời bỏ verifyToken để test
router.post('/', datTruocController.datTruocSach);
router.get('/lichsu', datTruocController.layLichSuCaNhan);

// Tạm thời bỏ checkThuThuOrAdmin để test
router.put('/:id/trangthai', datTruocController.capNhatDatTruoc);
router.get('/', datTruocController.getAllDatTruoc);

module.exports = router;