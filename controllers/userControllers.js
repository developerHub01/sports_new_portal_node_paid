const bcrypt = require("bcryptjs");
const UserServices = require("../services/userServices");

class UserControllers {
  async register(req, res) {
    try {
      const { fullName, userName, email, password } = req.body;

      if (req.user) return res.redirect("/");

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const payload = {
        fullName,
        userName,
        email,
        password: hashedPassword,
      };

      // Create a new user
      const user = UserServices.register(payload);

      if (!user || typeof user === "string") throw new Error(user);

      res.redirect("/login"); // Redirect to login after successful registration
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async addAdmin(req, res) {
    try {
      const { email } = req.body;

      const user = UserServices.addAdmin(email);

      if (!user || typeof user === "string") throw new Error(user);

      res.redirect("/dashboard/admins");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }

  async removeAdmin(req, res) {
    try {
      const { id } = req.params;

      const user = UserServices.removeAdmin(id);

      if (!user || typeof user === "string") throw new Error(user);

      res.redirect("/dashboard/admins");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
}

module.exports = new UserControllers();
