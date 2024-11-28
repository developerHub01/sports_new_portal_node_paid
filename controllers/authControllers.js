const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const Constant = require("../constant");

class AuthControllers {
  async register(req, res) {
    try {
      const { fullName, userName, email, password } = req.body;

      if (req.user) return res.redirect("/");

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new UserModel({
        fullName,
        userName,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.redirect("/login"); // Redirect to login after successful registration
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (req.user) return res.redirect("/");

      // Find the user by email
      const user = await UserModel.findOne({ email });
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

  async profileUpdate(req, res) {
    const { fullName, userName, email, role } = req.body;
    try {
      const user = await UserModel.findById(req.user.userId);

      // Update the user's details
      user.fullName = fullName || user.fullName;
      user.userName = userName || user.userName;
      user.email = email || user.email;
      user.role = role || user.role;

      // Save the updated user details
      await user.save();

      res.redirect("/profile"); // Redirect back to the profile page
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }

  async passwordChange(req, res) {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    try {
      const user = await UserModel.findById(req.user.userId);

      // Check if the current password matches
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordMatch) {
        return res.status(400).send("Current password is incorrect");
      }

      // Validate new password
      if (newPassword !== confirmPassword) {
        return res.status(400).send("New passwords do not match");
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      // Save the updated password
      await user.save();

      res.redirect("/profile"); // Redirect back to the profile page
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
}

module.exports = new AuthControllers();
