const express = require("express");
const { readTokenMiddleware } = require("../middlewares/readToken");
const UserControllers = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", readTokenMiddleware, UserControllers.register);

router.post("/add-admin", authMiddleware, UserControllers.addAdmin);

router.get("/remove-admin/:id", authMiddleware, UserControllers.removeAdmin);

module.exports = router;
