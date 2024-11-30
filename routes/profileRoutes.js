const express = require("express");
const AuthControllers = require("../controllers/authControllers");
const { readTokenMiddleware } = require("../middlewares/readToken");
const { authMiddleware } = require("../middlewares/authMiddleware");
const ProfileControllers = require("../controllers/profileControllers");

const router = express.Router();

router.post("/update", authMiddleware, ProfileControllers.profileUpdate);

router.post(
  "/change-password",
  authMiddleware,
  ProfileControllers.passwordChange
);

module.exports = router;
