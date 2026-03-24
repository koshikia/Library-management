const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const datTruocController = require('../controllers/dattruoc.controller');

// Tạm thời bỏ verifyToken để test
router.post('/', datTruocController.datTruocSach);
router.get('/lichsu', datTruocController.layLichSuCaNhan);

// Tạm thời bỏ checkThuThuOrAdmin để test
router.put('/:id/trangthai', datTruocController.capNhatDatTruoc);
router.get('/', datTruocController.getAllDatTruoc);
=======
const { isLoggedIn, isThuThu } = require('../middleware/auth.middleware');
const datTruocController = require('../controllers/dattruoc.controller');

router.post('/', isLoggedIn, datTruocController.datTruocSach);
router.get('/lichsu', isLoggedIn, datTruocController.layLichSuCaNhan);
router.put('/:id/trangthai', isThuThu, datTruocController.capNhatDatTruoc); 
router.get('/', isThuThu, datTruocController.getAllDatTruoc);
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a

module.exports = router;