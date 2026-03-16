const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { isAdmin } = require('../middleware/auth.middleware');

// Các route quản lý User (Chỉ Admin mới được phép)
router.get("/users", isAdmin, userController.getUsers);
router.post("/users", isAdmin, userController.addUser);
router.put("/users/:id", isAdmin, userController.updateUser);
router.delete("/users/:id", isAdmin, userController.deleteUser);
router.put('/users/:id/status', isAdmin, userController.updateStatus);

module.exports = router;