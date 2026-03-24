const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const controller = require('../controllers/dausach.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getDetail);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

=======
const { isThuThu } = require('../middleware/auth.middleware');
const controller = require('../controllers/dausach.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getDetail); 
router.post('/', isThuThu, controller.create); 
router.put('/:id', isThuThu, controller.update); 
router.delete('/:id', isThuThu, controller.delete);
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
module.exports = router;