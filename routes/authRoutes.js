const express = require("express");
const AuthControllers = require("../controllers/authControllers");
const { readTokenMiddleware } = require("../middlewares/readToken");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", readTokenMiddleware, AuthControllers.register);

router.post("/login", readTokenMiddleware, AuthControllers.login);

router.get("/logout", authMiddleware, AuthControllers.logout);

module.exports = router;
