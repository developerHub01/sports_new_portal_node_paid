const express = require("express");
const { readTokenMiddleware } = require("../middlewares/readToken");
const UserControllers = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const CommentControllers = require("../controllers/commentControllers");

const router = express.Router();

router.post("/", CommentControllers.create);

router.post("/delete/:id", CommentControllers.delete);

module.exports = router;
