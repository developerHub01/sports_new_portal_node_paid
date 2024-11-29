const NewsServices = require("../services/newsServices");

class NewsControllers {
  async create(req, res) {
    try {
      const { title, banner, category, content } = req.body;

      console.log(req.body);

      // Basic validation
      if (!title || !banner || !category || !content) {
        return res.status(400).send("All fields are required.");
      }

      const payload = {
        title,
        banner,
        category,
        content,
      };

      // Create a new news article
      const news = await NewsServices.create(payload);

      if (!news || typeof news === "string") throw new Error(news);

      res.redirect("/dashboard");
    } catch (err) {
      console.error("Error creating news:", err);
      res.status(500).send("Internal Server Error");
    }
  }

  async update(req, res) {
    try {
      const { title, banner, category, content } = req.body;
      const { id } = req.params;

      console.log(req.body);

      // Basic validation
      if (!title || !banner || !category || !content) {
        return res.status(400).send("All fields are required.");
      }

      const payload = {
        title,
        banner,
        category,
        content,
      };

      // Create a new news article
      const news = await NewsServices.update(id, payload);

      if (!news || typeof news === "string") throw new Error(news);

      res.redirect("/dashboard/news");
    } catch (err) {
      console.error("Error creating news:", err);
      res.status(500).send("Internal Server Error");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const news = await NewsServices.delete(id);

      if (!news || typeof news === "string") throw new Error(news);

      res.redirect("/dashboard");
    } catch (err) {
      console.error("Error creating news:", err);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new NewsControllers();
