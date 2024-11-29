const NewsModel = require("../models/newsModel");

class NewsServices {
  async index() {
    try {
      return (
        await NewsModel.find({})
          .populate({
            path: "category",
            select: "-_id name",
          })
          .lean()
      ).map((news) => ({
        ...news,
        category: news.category.name,
      }));
    } catch (e) {
      return [];
    }
  }

  async newsById(id) {
    try {
      return await NewsModel.findById(id).populate({
        path: "category",
        select: "-_id name",
      });
    } catch (e) {
      return [];
    }
  }

  async create(payload) {
    try {
      const newNews = await NewsModel.create(payload);

      return newNews; // Redirect to login after successful registration
    } catch (err) {
      return "Server error";
    }
  }

  async update(id, payload) {
    try {
      const updatedNews = await NewsModel.findByIdAndUpdate(id, payload);

      return updatedNews; // Redirect to login after successful registration
    } catch (err) {
      return "Server error";
    }
  }

  async delete(id) {
    try {
      const deletedNews = await NewsModel.findByIdAndDelete(id);

      return deletedNews; // Redirect to login after successful registration
    } catch (err) {
      return "Server error";
    }
  }

  async delete(id) {}
}

module.exports = new NewsServices();
