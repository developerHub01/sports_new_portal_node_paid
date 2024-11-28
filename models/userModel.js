const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    userName: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 150,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "super-admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
