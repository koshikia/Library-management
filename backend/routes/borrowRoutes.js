// backend/routes/borrowRoutes.js
const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

router.post('/', borrowController.createBorrow);
router.post('/renew', borrowController.renewBook);
// ... thêm các route khác như /return, /history

module.exports = router;