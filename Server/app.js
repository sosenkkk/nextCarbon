const dotenv = require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const path = require("path");
const MONGO_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.wxdleee.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const app = express();

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://next-carbon-git-main-sosenkkk.vercel.app", "https://next-carbon.vercel.app","https://next-carbon-al7l5k1lk-sosenkkk.vercel.app"],
    methods: ["POST", "GET", "HEAD", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(authRoutes);

app.use(adminRoutes);

app.use(userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const data = error.data;
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT);
  console.log("connected");
});
