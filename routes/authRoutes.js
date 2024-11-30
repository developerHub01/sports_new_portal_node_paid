const express = require("express");
const AuthControllers = require("../controllers/authControllers");
const { readTokenMiddleware } = require("../middlewares/readToken");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", AuthControllers.login);

router.get("/logout", authMiddleware, AuthControllers.logout);

module.exports = router;
