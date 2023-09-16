const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const enteredUser = await User.findOne({ email: email });
    if (enteredUser) {
      res
        .status(433)
        .json({ message: "User already registered.", userId: enteredUser._id });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      const result = await user.save();
      res
        .status(201)
        .json({ message: "User account created!", userId: result._id });
    }
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
        const token = jwt.sign({
          email: enteredUser.email,
          userId: enteredUser._id.toString(),
        }, 'my-secret', {expiresIn: '3h'});
        res.status(201).json({ message: "User logged In", token: token, userId : enteredUser._id.toString() });
      } else {
        res.status(433).json({ message: "User entered Incorrect password" });
      }
    } else {
      res.status(403).json({ message: "No such user found." });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.changePassword = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.oldpassword;
  const newPassword = req.body.newpassword;
  try {
    const enteredUser = await User.findOne({ email: email });
    if (!enteredUser) {
      res.status(433).json({ message: "User not registered." });
    } else {
      const passwordCheck = await bcrypt.compare(
        password,
        enteredUser.password
      );
      if (passwordCheck == true) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const updateUser = await User.findOneAndUpdate(
          { email: email },
          { password: hashedPassword },
          { returnOriginal: false }
        );

        res.status(201).json({ message: "User password changed!" });
      } else {
        res.status(433).json({ message: "User entered Incorrect password" });
      }
    }
  } catch (err) {
    console.log(err);
    next();
  }
};
