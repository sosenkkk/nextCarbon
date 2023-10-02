const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true },
  productModel: { type: String, required: true },
  productModelNumber: { type: String, required: true },
  productPrice:{type: Number , required: true},
  productImage: {
    type: String,
    default:
      "https://res.cloudinary.com/drlqa8duh/image/upload/v1695057776/ce8ft1g5enngqb1ninkb.jpg",
  },
});

module.exports = mongoose.model("product", productSchema);
