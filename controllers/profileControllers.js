const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");

class ProfileControllers {
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

module.exports = new ProfileControllers();