const { format } = require("date-fns");
const NewsServices = require("../services/newsServices");
const CommentServices = require("../services/commentServices");
const UserModel = require("../models/userModel");
const AboutUsServices = require("../services/aboutUsServices");

class ViewsControllers {
  async index(req, res) {
    console.log("====================");

    let { data } = req;
    const newsList = await NewsServices.index();

    const carouselSlides = newsList.slice(0, 3);

    data = {
      ...data,
      newsList,
      carouselSlides,
      role: req?.user?.role,
    };

    return res.render("pages/index", data);
  }

  async login(req, res) {
    if (req.user) return res.redirect("/");

    return res.render("pages/login");
  }

  async register(req, res) {
    if (req.user) return res.redirect("/");

    res.render("pages/register");
  }

  async dashboard(req, res) {
    let { data } = req;

    res.render("pages/dashboard", data);
  }

  async profile(req, res) {
    let { data } = req;

    res.render("pages/profile", data);
  }

  async category(req, res) {
    const { category } = req.params;
    let { data } = req;

    const newsList = await NewsServices.newsByCategory(category);

    data = {
      ...data,
      category,
      newsList,
    };

    return res.render("pages/category", data);
  }

  async newsById(req, res) {
    const { newsId } = req.params;
    let { userId } = req.user || {};

    userId = userId?.toString();

    let { data } = req;

    let isLoggedIn = userId;

    let loggedInUserData = null;
    if (isLoggedIn) {
      loggedInUserData = await UserModel.findById(userId);
    }

    const news = await NewsServices.newsById(newsId);
    const comments = (await CommentServices.index()).map((comment) => {
      return {
        ...comment,
        isDeleteable:
          (loggedInUserData &&
            [("admin", "super-admin")].includes(loggedInUserData?.role)) ||
          comment.user._id.toString() === userId,
      };
    });

    if (news) {
      news.createdAt = format(new Date(news.createdAt), "MM/dd/yyyy");
      news.updatedAt = format(new Date(news.updatedAt), "MM/dd/yyyy");
    }

    data = {
      ...data,
      newsId,
      news,
      comments,
    };

    return res.render("pages/news", data);
  }

  async aboutUs(req, res) {
    let { data } = req;

    const aboutUsData = await AboutUsServices.index();

    data = {
      ...data,
      aboutUsData,
    };

    return res.render("pages/about-us", data);
  }
}

module.exports = new ViewsControllers();
