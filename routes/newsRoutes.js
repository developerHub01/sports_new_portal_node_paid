const express = require("express");
const NewsControllers = require("../controllers/newsControllers");
const { readTokenMiddleware } = require("../middlewares/readToken");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, NewsControllers.create);

router.post("/update/:id", authMiddleware, NewsControllers.update);

router.get("/delete/:id", authMiddleware, NewsControllers.delete);

module.exports = router;
