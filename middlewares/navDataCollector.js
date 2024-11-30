const UserModel = require("../models/userModel");
const CategoryServices = require("../services/categoryServices");

const navDataCollectorMiddleware = async (req, res, next) => {
  // const sportsCategoryList = [
  //   {
  //     id: 1,
  //     title: "Football",
  //   },
  //   {
  //     id: 2,
  //     title: "Basketball",
  //   },
  //   {
  //     id: 3,
  //     title: "Tennis",
  //   },
  //   {
  //     id: 4,
  //     title: "Cricket",
  //   },
  //   {
  //     id: 5,
  //     title: "Golf",
  //   },
  //   {
  //     id: 6,
  //     title: "Athletics",
  //   },
  //   {
  //     id: 7,
  //     title: "Boxing",
  //   },
  //   {
  //     id: 8,
  //     title: "Rugby",
  //   },
  //   {
  //     id: 9,
  //     title: "Motorsports",
  //   },
  //   {
  //     id: 10,
  //     title: "MMA",
  //   },
  // ];

  let data = {
    user: null,
    sportsCategoryList: [],
  };

  req.data = data;

  try {
    const sportsCategoryList = await CategoryServices.index();

    req.data = { ...req.data, sportsCategoryList };

    if (!req.user || !req.user.userId) return next();

    const userData = await UserModel.findById(req.user.userId);

    req.data = { ...req.data, user: userData };

    return next();
  } catch (error) {
    return next();
  }
};

module.exports = { navDataCollectorMiddleware };
