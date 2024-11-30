const CommentModel = require("../models/commentModel");

class CommentServices {
  async index() {
    try {
      return await CommentModel.find({})
        .populate({
          path: "news",
          select: "title",
        })
        .populate({
          path: "user",
          select: "fullName email role",
        })
        .lean();
    } catch (e) {
      return [];
    }
  }

  async create(payload) {
    try {
      return await CommentModel.create(payload);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id) {
    try {
      return await CommentModel.findByIdAndDelete(id);
    } catch (e) {}
  }
}

module.exports = new CommentServices();
