const CategoryModel = require("../models/categoryModel");
const NewsModel = require("../models/newsModel");

class CategoryServices {
  async index() {
    try {
      return await CategoryModel.find({});
    } catch (e) {
      return [];
    }
  }

  async categoriesWithNumberOfNews() {
    try {
      return await CategoryModel.aggregate([
        {
          $lookup: {
            from: "news", // Collection name of NewsModel
            localField: "_id",
            foreignField: "category",
            as: "newsList",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            newsCount: { $size: "$newsList" }, // Add news count field
          },
        },
      ]);
    } catch (err) {
      return "Internal Server Error";
    }
  }

  async create(name) {
    try {
      // Validation
      if (!name) {
        return "Category name is required.";
      }

      // Check for duplicate
      const existingCategory = await CategoryModel.findOne({ name });
      if (existingCategory) {
        return "Category already exists.";
      }

      const category = new CategoryModel({ name });
      await category.save();

      return category;
    } catch (err) {
      return "Internal Server Error";
    }
  }

  async update(id, name) {
    try {
      // Validation
      if (!name) {
        return res.status(400).send("Category name is required.");
      }

      const category = await CategoryModel.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if (!category) {
        return r("Category not found.");
      }

      return category;
    } catch (err) {
      return "Internal Server Error";
    }
  }

  async delete(id) {
    try {
      const existingNews = await NewsModel.findOne({ category: id });
      if (existingNews) {
        return "Cannot delete this category as there are news items associated with it.";
      }

      // Proceed to delete the category if no associated news
      const category = await CategoryModel.findByIdAndDelete(id);
      
      if (!category) {
        return "Category not found.";
      }

      return category;
    } catch (err) {
      return "Internal Server Error";
    }
  }
}

module.exports = new CategoryServices();
