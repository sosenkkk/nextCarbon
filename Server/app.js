const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");

const MONGO_URI =
  "mongodb+srv://sosenkkk:sosenk@cluster1.wxdleee.mongodb.net/carbon?retryWrites=true&w=majority";
const app = express();
const PORT = process.env.PORT || 8080;
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "user-sessions",
})

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "HEAD", "PUT", "DELETE"],
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/images", express.static(path.join(__dirname, "images")));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET",
//     "POST",
//     "PUT",
//     "PATCH",
//     "DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use((req, res) => {
  console.log(req.cookies);
  // console.log(req);
})

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
