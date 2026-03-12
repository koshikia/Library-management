const express = require('express');
const router = express.Router();
const { isLoggedIn, isThuThu } = require('../middleware/auth.middleware');
const datTruocController = require('../controllers/dattruoc.controller');

router.post('/', isLoggedIn, datTruocController.datTruocSach);
router.get('/lichsu', isLoggedIn, datTruocController.layLichSuCaNhan);
router.put('/:id/trangthai', isThuThu, datTruocController.capNhatDatTruoc); 
router.get('/', isThuThu, datTruocController.getAllDatTruoc);

module.exports = router;