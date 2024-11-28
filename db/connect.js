const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sports_news");

    console.log("database connection established");
  } catch (error) {
    console.log("database connection failed");
    console.log(error);
  }
};

module.exports = connectDB;
