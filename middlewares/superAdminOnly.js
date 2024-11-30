const jwt = require("jsonwebtoken");
const Constant = require("../constant");
const UserModel = require("../models/userModel");

const superAdminOnlyMiddleware = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.redirect("/"); // Redirect to login if not authenticated
  }

  try {
    const decoded = jwt.verify(token, Constant.AUTH_SECRET);
    req.user = decoded;

    const userData = await UserModel.findById(decoded.userId);

    if (!userData || !["super-admin"].includes(userData.role)) {
      return res.redirect("/dashboard");
    }

    req.user = { ...req.user, role: userData.role };

    next();
  } catch (err) {
    console.error(err);
    res.redirect("/login"); // Redirect to login if the token is invalid
  }
};

module.exports = { superAdminOnlyMiddleware };
