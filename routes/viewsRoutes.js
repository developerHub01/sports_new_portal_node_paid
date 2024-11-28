const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { readTokenMiddleware } = require("../middlewares/readToken");
const ViewsControllers = require("../controllers/viewsControllers");

const router = express.Router();

router.get("/", readTokenMiddleware, ViewsControllers.index);

router.get("/login", readTokenMiddleware, ViewsControllers.login);

router.get("/register", readTokenMiddleware, ViewsControllers.register);

router.get("/dashboard", authMiddleware, ViewsControllers.dashboard);

router.get("/profile", authMiddleware, ViewsControllers.profile);

router.get("/category/:categoryName", authMiddleware, ViewsControllers.category);

module.exports = router;
