const express = require("express");
const AboutUsControllers = require("../controllers/aboutUsController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/update", authMiddleware, AboutUsControllers.update);

module.exports = router;
