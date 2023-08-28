const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
    });
    const result = await user.save();
    res
      .status(201)
      .json({ message: "User account created!", userId: result._id });
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.login= async(req, res, next)=>{

}
