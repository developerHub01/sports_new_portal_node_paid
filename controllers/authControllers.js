const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const Constant = require("../constant");

class AuthControllers {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (req.user) return res.redirect("/");

      // Find the user by email
      const user = await UserModel.findOne({ email }).select("password");
      if (!user) {
        return res.status(400).send("Invalid email or password");
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid email or password");
      }

      // Generate a JWT
      const token = jwt.sign({ userId: user._id }, Constant.AUTH_SECRET, {
        expiresIn: "30d",
      });

      // Set the token as a cookie
      res.cookie("authToken", token, { httpOnly: true });
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
  async logout(req, res) {
    res.clearCookie("authToken");
    res.redirect("/login");
  }
}

module.exports = new AuthControllers();
