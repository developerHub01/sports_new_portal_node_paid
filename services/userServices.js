const UserModel = require("../models/userModel");

class UserServices {
  async index() {
    try {
      return await UserModel.find({});
    } catch (e) {
      return [];
    }
  }

  async addAdmin(email) {
    try {
      return await UserModel.findOneAndUpdate(
        { email, role: "user" },
        {
          role: "admin",
        }
      );
    } catch (e) {}
  }

  async removeAdmin(id) {
    try {
      return await UserModel.findOneAndUpdate(
        { _id: id, role: "admin" },
        {
          role: "user",
        }
      );
    } catch (e) {}
  }

  async admins() {
    try {
      return await UserModel.find({ role: "admin" });
    } catch (e) {
      return [];
    }
  }

  async register(payload) {
    try {
      const newUser = await UserModel.create(payload);

      return newUser; // Redirect to login after successful registration
    } catch (err) {
      console.log(err);

      return "Server error";
    }
  }
}

module.exports = new UserServices();
