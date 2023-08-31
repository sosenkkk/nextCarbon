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

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const enteredUser = await User.findOne({ email: email });
    if (enteredUser) {
      const passwordCheck = await bcrypt.compare(
        password,
        enteredUser.password
      );
      if (passwordCheck == true) {
         res.status(201).json({ message: "User logged In" });
      }else{
        res.status(433).json({message:"User entered Incorrect password"})
      }
    }else{
      res.status(403).json({message:"No such user found."})
    }
  } catch (err) {
    console.log(err);
    next();
  }
};
