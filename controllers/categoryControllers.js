const CategoryModel = require("../models/categoryModel");
const NewsModel = require("../models/newsModel");
const CategoryServices = require("../services/categoryServices");

class CategoryControllers {
  async categoriesWithNumberOfNews(req, res) {
    try {
      const categories = await CategoryServices.categoriesWithNumberOfNews();

      if (!categories || typeof categories === "string")
        throw new Error(categories);

      return categories;
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async create(req, res) {
    try {
      let { name } = req.body;

      name = name.split(" ").join("-");

      const categories = await CategoryServices.create(name);

      if (!categories || typeof categories === "string")
        throw new Error(categories);

      res.redirect("/dashboard/categories");
    } catch (err) {
      console.error("Error creating category:", err);
      res.status(500).send("Internal Server Error");
    }
  }

  async update(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.params;

      const categories = await CategoryServices.update(id, name);

      if (!categories || typeof categories === "string")
        throw new Error(categories);

      res.redirect("/dashboard/categories");
    } catch (err) {
      console.error("Error creating category:", err);
      res.status(500).send("Internal Server Error");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      console.log({ id });

      const categories = await CategoryServices.delete(id);

      if (!categories || typeof categories === "string")
        throw new Error(categories);

      res.redirect("/dashboard/categories");
    } catch (err) {
      console.error("Error deleting category:", err);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new CategoryControllers();
