const express = require('express');
const router = express.Router();
const { isThuThu } = require('../middleware/auth.middleware');
const datTruocController = require('../controllers/dattruoc.controller');

router.post('/', datTruocController.datTruocSach);
router.get('/lichsu', datTruocController.layLichSuCaNhan);
router.put('/:id/trangthai', isThuThu, datTruocController.capNhatDatTruoc); 
router.get('/', isThuThu, datTruocController.getAllDatTruoc);

module.exports = router;