const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { readTokenMiddleware } = require("../middlewares/readToken");
const ViewsControllers = require("../controllers/viewsControllers");
const { navDataCollectorMiddleware } = require("../middlewares/navDataCollector");

const router = express.Router();

router.get(
  "/",
  readTokenMiddleware,
  navDataCollectorMiddleware,
  ViewsControllers.index
);

router.get(
  "/login",
  readTokenMiddleware,
  ViewsControllers.login
);

router.get(
  "/register",
  readTokenMiddleware,
  ViewsControllers.register
);

router.get(
  "/profile",
  authMiddleware,
  navDataCollectorMiddleware,
  ViewsControllers.profile
);

router.get(
  "/category/:categoryName",
  authMiddleware,
  navDataCollectorMiddleware,
  ViewsControllers.category
);

router.get(
  "/news/:newsId",
  authMiddleware,
  navDataCollectorMiddleware,
  ViewsControllers.newsById
);

module.exports = router;
