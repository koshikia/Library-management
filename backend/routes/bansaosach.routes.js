const express = require('express');
const router = express.Router();
const { isThuThu } = require('../middleware/auth.middleware');
const controller = require('../controllers/bansaosach.controller');

router.post('/', isThuThu, controller.create);
router.put('/:id', isThuThu, controller.updateStatus);
router.delete('/:id', isThuThu, controller.delete);

module.exports = router;