const jwt = require("jsonwebtoken");
const Constant = require("../constant");

const readTokenMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, Constant.AUTH_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.redirect("/login"); // Redirect to login if the token is invalid
  }
};

module.exports = { readTokenMiddleware };
