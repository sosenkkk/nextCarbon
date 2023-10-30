const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "sunilcarbon112200@gmail.com",
    pass: "cczf rbsy xblp pswp",
  },
});

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
        const token = jwt.sign(
          {
            email: enteredUser.email,
            userId: enteredUser._id.toString(),
          },
          `${process.env.json_secret}`,
          { expiresIn: "1h" }
        );

        res.cookie("jwt", token, { maxAge: 1000 * 60 * 60, httpOnly: true, sameSite:"none", secure:true  });

        res.status(201).json({
          message: "User logged In",
          token: token,
          userId: enteredUser._id.toString(),
        });
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
    res.status(404).json({ message: "Some error occured" });

    next();
  }
};
exports.postResetPassword = async (req, res, next) => {
  const email = req.body.email;
  try {
    const enteredUser = await User.findOne({ email: email });
    if (!enteredUser) {
      res.status(433).json({ message: "User not registered." });
    } else {
      const secret = `${process.env.json_secret}` + enteredUser.password;
      const payload = {
        email: enteredUser.email,
        id: enteredUser._id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      const link = `http://localhost:3000/auth/${enteredUser._id}/${token}`;
      const mailOptions = {
        from: { name: "Carbon", email: "sunilcarbon112200@gmail.com" },
        to: enteredUser.email,
        subject: "Reset your password",
        html: `<body>
        <h2>Hello ${enteredUser.firstName}! </h2>
        
      <h3>Click the link below to reset your account <br> </h3> <a  style=" background-color: teal; color: white; padding: 1rem; border-radius: 12px; margin-bottom:2rem;" href="${link}" target="_blank" >Click to reset</a></body>`,
      };
      transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Error Sending OTP" });
        } else if (success) {
          res
            .status(201)
            .json({ message: "Password reset link has been sent to email." });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Some error occured" });
    next();
  }
};
exports.getResetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { email, password } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(433).json({ message: "Invalid Link." });
    } else {
      const secret = `${process.env.json_secret}` + user.password;
      try {
        const payload = jwt.verify(token, secret);
        if (payload.email != email) {
          res.status(433).json({ message: "Incorrect Email" });
        } else {
          const hashedPassword = await bcrypt.hash(password, 12);
          const updateUser = await User.findOneAndUpdate(
            { email: email },
            { password: hashedPassword },
            { returnOriginal: false }
          );
          res.status(201).json({ message: "User password changed!" });
        }
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Retry with a new link." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Some Error Occured. Invalid Link." });
  }
};

exports.getLogout = async (req, res, next) => {
  try {
    await res.clearCookie("jwt");
    res.status(201).json({ message: "User Logged Out." });
  } catch (err) {
    console.log(err);
    res.status(433).json({ message: "Erro logging out User." });
  }
};
