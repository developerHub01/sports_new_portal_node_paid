const CategoryModel = require("../models/categoryModel");
const NewsModel = require("../models/newsModel");
const UserModel = require("../models/userModel");
const CommentModel = require("../models/commentModel");
const CategoryServices = require("../services/categoryServices");
const CommentServices = require("../services/commentServices");
const NewsServices = require("../services/newsServices");
const UserServices = require("../services/userServices");
const AboutUsServices = require("../services/aboutUsServices");

class DashboardViewsControllers {
  async dashboard(req, res) {
    const { role } = req.user;

    const newsCount = await NewsModel.countDocuments();
    const categoryCount = await CategoryModel.countDocuments();
    const userCount = await UserModel.countDocuments();
    const adminCount = await UserModel.find({
      $or: [{ role: "admin" }, { role: "super-admin" }],
    }).countDocuments();
    const commentCount = await CommentModel.countDocuments();

    const data = {
      role,
      newsCount,
      categoryCount,
      userCount,
      adminCount,
      commentCount,
    };

    res.render("pages/dashboard", data);
  }

  async aboutUs(req, res) {
    const { role } = req.user;
    const aboutUsData = await AboutUsServices.index();

    console.log(aboutUsData);

    const data = {
      role,
      aboutUsData,
    };

    res.render("pages/edit-about-us", data);
  }

  async createNews(req, res) {
    const { role } = req.user;
    const categories = await CategoryServices.index();

    res.render("pages/create-news", { categories, role });
  }

  async editNews(req, res) {
    const { id } = req.params;
    const { role } = req.user;

    const news = await NewsServices.newsById(id);
    const categories = await CategoryServices.index();

    const data = { news, categories, role };

    res.render("pages/edit-news", data);
  }

  async news(req, res) {
    const { role } = req.user;
    const categories = await CategoryServices.index();
    const newsList = await NewsServices.index();

    const data = {
      newsList,
      categories,
      role,
    };

    res.render("pages/dashboard-news", data);
  }

  async admins(req, res) {
    const { role } = req.user;
    const admins = await UserServices.admins();

    res.render("pages/admins", { admins, role });
  }

  async categories(req, res) {
    const { role } = req.user;
    const categories = await CategoryServices.categoriesWithNumberOfNews();

    res.render("pages/dashboard-categories", { categories, role });
  }

  async users(req, res) {
    const { role } = req.user;
    const users = await UserServices.index();

    res.render("pages/dashboard-users", { users, role });
  }

  async comments(req, res) {
    const { role } = req.user;
    const comments = (await CommentServices.index()).map((comment) => ({
      ...comment,
      isDeleteable: true,
    }));

    res.render("pages/dashboard-comments", { comments, role });
  }
}

module.exports = new DashboardViewsControllers();
