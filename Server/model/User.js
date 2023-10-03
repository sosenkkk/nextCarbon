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
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  
  this.cart = updatedCartItems;
  return this.save();
};

userSchema.methods.getCart = function () {
  const productIds = this.cart.map((i) => {
    return i.productId;
  });

  return db
    .collection("products")
    .find({ _id: { $in: productIds } })
    .toArray()
    .then((products) => {
      return products.map((p) => {
        return {
          ...p,
          quantity: this.cart.find((i) => {
            return i.productId.toString() === p._id.toString();
          }).quantity,
        };
      });
    });
};

userSchema.methods.removeFromCart = function (id) {
  const updatedCartItems = this.cart.filter((item) => {
    return item._id.toString() !== id.toString();
  });
  this.cart = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart= function(){
  this.cart= [];
  return this.save();
}


module.exports = mongoose.model("User", userSchema);
