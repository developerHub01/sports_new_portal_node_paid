const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const ViewsControllers = require("../controllers/viewsControllers");
const { navDataCollectorMiddleware } = require("../middlewares/navDataCollector");

const router = express.Router();

router.get(
  "/",
  navDataCollectorMiddleware,
  ViewsControllers.index
);

router.get(
  "/login",
  ViewsControllers.login
);

router.get(
  "/register",
  ViewsControllers.register
);

router.get(
  "/profile",
  authMiddleware,
  navDataCollectorMiddleware,
  ViewsControllers.profile
);

router.get(
  "/category/:category",
  navDataCollectorMiddleware,
  ViewsControllers.category
);

router.get(
  "/news/:newsId",
  navDataCollectorMiddleware,
  ViewsControllers.newsById
);

router.get(
  "/about-us",
  navDataCollectorMiddleware,
  ViewsControllers.aboutUs
);

module.exports = router;
