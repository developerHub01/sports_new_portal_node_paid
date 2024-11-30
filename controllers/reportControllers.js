const ReportModel = require("../models/reportModel");
const ReportServices = require("../services/reportServices");

class ReportControllers {
  async create(req, res) {
    try {
      const payload = req.body;

      console.log(payload);

      payload["user"] = req.user.userId;

      const { news } = req.body;

      const comments = ReportServices.create(payload);

      if (!comments || typeof comments === "string") throw new Error(comments);

      res.redirect(`/news/${news}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const { back } = req.query;

      const user = ReportServices.delete(id);

      if (!user || typeof user === "string") throw new Error(user);

      const newsId = ((await ReportModel.findById(id)) || {}).news;

      if (back === "dashboard") return res.redirect("/dashboard/reports");
      return res.redirect(`/news/${newsId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
}

module.exports = new ReportControllers();
