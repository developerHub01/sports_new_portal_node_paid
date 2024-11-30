const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Bringing you the latest",
      trim: true,
    },
    description: {
      type: String,
      default:
        "Our mission is to keep you informed with the most exciting and up-to-date sports news from around the world. Whether it's football, basketball, cricket, or any sport you love, we've got you covered.",
      trim: true,
    },
    highlight: {
      type: String,
      default: "sports updates",
      trim: true,
    },
    buttonText: {
      type: String,
      default: "Explore News",
    },
    buttonLink: {
      type: String,
      default: "/",
    },
    imageUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1579156618335-f6245e05236a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BvcnRzfGVufDB8fDB8fHww",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AboutUs", AboutUsSchema);
