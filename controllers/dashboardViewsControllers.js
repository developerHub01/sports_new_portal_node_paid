class DashboardViewsControllers {
  async dashboard(req, res) {
    res.render("pages/dashboard");
  }

  async createNews(req, res) {
    res.render("pages/create-news");
  }

  async editNews(req, res) {
    res.render("pages/edit-news");
  }

  async news(req, res) {
    res.render("pages/dashboard-news");
  }

  async admins(req, res) {
    res.render("pages/admins");
  }

  async categories(req, res) {
    res.render("pages/dashboard-categories");
  }

  async users(req, res) {
    res.render("pages/users");
  }

  async comments(req, res) {
    res.render("pages/dashboard-comments");
  }
}

module.exports = new DashboardViewsControllers();
