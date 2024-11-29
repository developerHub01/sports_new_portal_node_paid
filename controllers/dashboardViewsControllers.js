const CategoryServices = require("../services/categoryServices");
const NewsServices = require("../services/newsServices");
const UserServices = require("../services/userServices");

class DashboardViewsControllers {
  async dashboard(req, res) {
    res.render("pages/dashboard");
  }

  async createNews(req, res) {
    const categories = await CategoryServices.index();

    res.render("pages/create-news", { categories });
  }

  async editNews(req, res) {
    const { id } = req.params;

    const news = await NewsServices.newsById(id);
    const categories = await CategoryServices.index();

    const data = { news, categories };

    res.render("pages/edit-news", data);
  }

  async news(req, res) {
    const categories = await CategoryServices.index();
    const newsList = await NewsServices.index();

    const data = {
      newsList,
      categories,
    };

    res.render("pages/dashboard-news", data);
  }

  async admins(req, res) {
    const admins = await UserServices.admins();

    res.render("pages/admins", { admins });
  }

  async categories(req, res) {
    const categories = await CategoryServices.categoriesWithNumberOfNews();

    res.render("pages/dashboard-categories", { categories });
  }

  async users(req, res) {
    const users = await UserServices.index();

    res.render("pages/dashboard-users", { users });
  }

  async comments(req, res) {
    res.render("pages/dashboard-comments");
  }
}

module.exports = new DashboardViewsControllers();
