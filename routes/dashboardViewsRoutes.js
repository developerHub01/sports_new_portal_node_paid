const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const DashboardViewsControllers = require("../controllers/dashboardViewsControllers");

const router = express.Router();

router.get("/", authMiddleware, DashboardViewsControllers.dashboard);

router.get(
  "/create-news",
  authMiddleware,
  DashboardViewsControllers.createNews
);

router.get("/edit-news", authMiddleware, DashboardViewsControllers.editNews);

router.get("/news", authMiddleware, DashboardViewsControllers.news);

router.get("/admins", authMiddleware, DashboardViewsControllers.admins);

router.get("/categories", authMiddleware, DashboardViewsControllers.categories);

router.get("/users", authMiddleware, DashboardViewsControllers.users);

router.get("/comments", authMiddleware, DashboardViewsControllers.comments);

module.exports = router;
