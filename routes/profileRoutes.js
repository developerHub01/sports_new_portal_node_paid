const express = require("express");
const AuthControllers = require("../controllers/authControllers");
const { readTokenMiddleware } = require("../middlewares/readToken");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/update", authMiddleware, AuthControllers.profileUpdate);

router.post(
  "/change-password",
  authMiddleware,
  AuthControllers.passwordChange
);

module.exports = router;
