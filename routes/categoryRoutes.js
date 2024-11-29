const express = require("express");
const CategoryControllers = require("../controllers/categoryControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, CategoryControllers.create);

router.post("/update/:id", authMiddleware, CategoryControllers.update);

router.get("/delete/:id", authMiddleware, CategoryControllers.delete);

module.exports = router;
