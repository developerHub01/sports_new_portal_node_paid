const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const DashboardViewsControllers = require("../controllers/dashboardViewsControllers");
const { adminOnlyMiddleware } = require("../middlewares/adminOnly");
const { superAdminOnlyMiddleware } = require("../middlewares/superAdminOnly");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  adminOnlyMiddleware,
  DashboardViewsControllers.dashboard
);

router.get(
  "/create-news",
  authMiddleware,
  adminOnlyMiddleware,
  DashboardViewsControllers.createNews
);

router.get(
  "/edit-news/:id",
  authMiddleware,
  adminOnlyMiddleware,
  DashboardViewsControllers.editNews
);

router.get(
  "/news",
  authMiddleware,
  adminOnlyMiddleware,
  DashboardViewsControllers.news
);

router.get(
  "/admins",
  authMiddleware,
  superAdminOnlyMiddleware,
  DashboardViewsControllers.admins
);

router.get(
  "/categories",
  authMiddleware,
  adminOnlyMiddleware,
  DashboardViewsControllers.categories
);

router.get(
  "/users",
  authMiddleware,
  superAdminOnlyMiddleware,
  DashboardViewsControllers.users
);

router.get(
  "/comments",
  authMiddleware,
  adminOnlyMiddleware,
  DashboardViewsControllers.comments
);

module.exports = router;
