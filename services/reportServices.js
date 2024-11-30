const ReportModel = require("../models/reportModel");

class ReportServices {
  async index() {
    try {
      return await ReportModel.find({})
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
      return await ReportModel.create(payload);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id) {
    try {
      return await ReportModel.findByIdAndDelete(id);
    } catch (e) {}
  }
}

module.exports = new ReportServices();
