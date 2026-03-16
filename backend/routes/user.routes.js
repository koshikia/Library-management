const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { isAdmin } = require('../middleware/auth.middleware');
router.get("/users", isAdmin, userController.getUsers);
router.post("/users", isAdmin, userController.addUser);
router.put("/users/:id", isAdmin, userController.updateUser);
router.delete("/users/:id", isAdmin, userController.deleteUser);
module.exports = router;