const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const controller = require('../controllers/bansaosach.controller');

router.post('/', controller.create);
router.put('/:id', controller.updateStatus);
router.delete('/:id', controller.delete);
=======
const { isThuThu } = require('../middleware/auth.middleware');
const controller = require('../controllers/bansaosach.controller');

router.get('/:maDauSach', isThuThu, controller.getByMaDauSach);
router.post('/', isThuThu, controller.create);
router.put('/:id', isThuThu, controller.updateStatus);
router.delete('/:id', isThuThu, controller.delete);
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a

module.exports = router;