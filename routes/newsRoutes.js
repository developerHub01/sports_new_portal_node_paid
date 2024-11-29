const express = require("express");
const NewsControllers = require("../controllers/newsControllers");
const { readTokenMiddleware } = require("../middlewares/readToken");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, NewsControllers.create);

module.exports = router;
