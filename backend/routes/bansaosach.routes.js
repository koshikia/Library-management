const express = require('express');
const router = express.Router();
const controller = require('../controllers/bansaosach.controller');

router.post('/', controller.create);
router.put('/:id', controller.updateStatus);
router.delete('/:id', controller.delete);

module.exports = router;