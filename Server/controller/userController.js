const User = require("../model/User");
const mongoose = require("mongoose");


exports.accountInfo = async (req, res, next) => {
  try {
    const userId = req.userId;
    const userInfo = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
    if (userInfo) {
      res
        .status(202)
        .json({
          message: "User data found!",
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          cart: userInfo.cart,
        });
    } else {
      res.status(404).json({ message: "Some Error Happened, User not found" });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};
