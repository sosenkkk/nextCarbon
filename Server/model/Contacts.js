const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  message: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps:true});

module.exports = mongoose.model("Contact", contactSchema);
