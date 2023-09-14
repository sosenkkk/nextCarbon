const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 8080;

const mongoUrl =
  "mongodb+srv://sosenkkk:sosenk@cluster1.wxdleee.mongodb.net/carbon";
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use((req, res, next) => {
  res.locals.isAuthenticated = true;
  next();
});

app.use(authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const data = error.data;
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(mongoUrl + "?retryWrites=true&w=majority").then(() => {
  app.listen(PORT);
  console.log("connected");
});
