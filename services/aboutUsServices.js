const AboutUsModel = require("../models/aboutUsModel");

class AboutUsServices {
  async index() {
    try {
      const aboutUs = await AboutUsModel.findOne();
      return aboutUs || null;
    } catch (error) {
      return `Error retrieving About Us data: ${error.message}`;
    }
  }

  async update(payload) {
    try {
      return await AboutUsModel.findOneAndUpdate({}, payload, {
        new: true,
        upsert: true,
      });
    } catch (err) {
      return `Error updating About Us data: ${err.message}`;
    }
  }
}

module.exports = new AboutUsServices();
