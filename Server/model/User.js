const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, default: "New" },
  lastName: { type: String, default: "User" },
  phoneNo: { type: Number },
  profile: {
    type: String,
    default:
      "https://res.cloudinary.com/drlqa8duh/image/upload/v1695057776/ce8ft1g5enngqb1ninkb.jpg",
  },
  cart: [
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "Products",
    // },
  ],
});

module.exports = mongoose.model("User", userSchema);
