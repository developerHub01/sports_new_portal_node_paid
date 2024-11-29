const NewsModel = require("../models/newsModel");

class NewsControllers {
  async create(req, res) {
    try {
      const { title, banner, category, description } = req.body;

      // Basic validation
      if (!title || !banner || !category || !description) {
        return res.status(400).send("All fields are required.");
      }

      // Create a new news article
      const news = new NewsModel({
        title,
        banner,
        category,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Save the news article to the database
      await news.save();

      // Redirect to a success page or the dashboard
      res.redirect("/dashboard");
    } catch (err) {
      console.error("Error creating news:", err);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new NewsControllers();
