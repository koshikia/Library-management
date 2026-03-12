const express = require('express');
const router = express.Router();
const { isThuThu } = require('../middleware/auth.middleware');
const controller = require('../controllers/dausach.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getDetail); 
router.post('/', isThuThu, controller.create); 
router.put('/:id', isThuThu, controller.update); 
router.delete('/:id', isThuThu, controller.delete);
module.exports = router;