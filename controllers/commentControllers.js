const CommentModel = require("../models/commentModel");
const CommentServices = require("../services/commentServices");

class CommentControllers {
  async create(req, res) {
    try {
      const payload = req.body;
      console.log(req.body);

      payload["user"] = req.user.userId;

      const { news } = req.body;

      const comments = CommentServices.create(payload);

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

      const user = CommentServices.delete(id);

      if (!user || typeof user === "string") throw new Error(user);

      const newsId = ((await CommentModel.findById(id)) || {}).news;

      if (back === "dashboard") return res.redirect("/dashboard/comments");
      return res.redirect(`/news/${newsId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
}

module.exports = new CommentControllers();
