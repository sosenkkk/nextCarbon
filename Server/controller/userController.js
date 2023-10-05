const User = require("../model/User");
const Message = require("../model/Contacts");
const Product = require("../model/Product");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: `drlqa8duh`,
  api_key: `858762281996182`,
  api_secret: `Dh5ROsG7lszeA85kUPLVwuupOkA`,
});

exports.accountInfo = async (req, res, next) => {
  try {
    const userId = req.userId;
    const userInfo = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
    if (userInfo) {
      res.status(202).json({
        message: "User data found!",
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        cart: userInfo.cart,
        profile: userInfo.profile,
      });
    } else {
      res.status(404).json({ message: "Some Error Happened, User not found" });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.editInfo = async (req, res, next) => {
  let uploadedFile = null;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  const userId = req.userId;

  if (req.files) {
    uploadedFile = req.files.image;
    cloudinary.uploader.upload(
      uploadedFile.tempFilePath,
      { folder: "carbon" },
      async (err, result) => {
        if (err) {
          res.status(433).json({ message: "Some error occured. Try again" });
          console.log(err);
        } else {
          const imageUrl = result.url;
          const user = await User.findById(userId);
          user.profile = imageUrl;

          if (firstName.trim().length > 0) {
            user.firstName = firstName;
          }
          if (lastName.trim().length > 0) {
            user.lastName = lastName;
          }
          const updatedUser = await user.save();
          res.status(201).json({ message: "User Updated" });
        }
      }
    );
  } else {
    const user = await User.findById(userId);
    if (firstName.trim().length > 0) {
      user.firstName = firstName;
    }
    if (lastName.trim().length > 0) {
      user.lastName = lastName;
    }
    const updatedUser = await user.save();
    res.status(201).json({ message: "User Updated" });
  }
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res
    .status(201)
    .json({ message: "Products fetched Successfully", products: products });
};

exports.deleteFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    user.removeFromCart(cartId);
    res.status(201).json({ message: "Item deleted from cart!" });
  } catch (error) {
    console.log(error);
    res.status(433).json({ message: "Unable to update cart" });
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    user.clearCart();
    res.status(201).json({ message: "Cart Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(433).json({ message: "Unable to delete cart!" });
  }
};
exports.contactUs = async (req, res, next) => {
  try {
    const message = req.body.message;
    const userId = req.userId;
    const newMessage = await new Message({
      message: message,
      user: userId,
    });
    const messageSave = await newMessage.save();
    res.status(201).json({ message: "Message sent successfully." });
  } catch (err) {
    console.log(err);
    res.status(433).json({ message: "Message not sent due to some error." });
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const userId = req.userId;
    const product = await Product.findById(prodId);
    const user = await User.findOne({ _id: userId });
    const updateduser = user.addToCart(product);
    res.status(201).json({ message: "Added to cart" });
  } catch (err) {
    console.log(err);
    res.status(433).json({ message: "Item not added to cart" });
  }
};

exports.getCart = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId })
    .populate("cart.productId")
    .then((user) => {
      const products = user.cart;
      res.status(201).json({ products: products });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getTotal = async (req, res, next) => {
  const userId = req.userId;
  try {
    let totalPrice = 0,
      totalQuantity = 0;
    const user = await User.findOne({ _id: userId }).populate("cart.productId");

    const products = user.cart;
    products.forEach((product) => {
      totalPrice =
        totalPrice + product.productId.productPrice * product.quantity;
      totalQuantity = totalQuantity + product.quantity;
    });
    res.status(201).json({
      message: "Successfully fetched cart.",
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Internal Error! Unable to fetch cart." });
  }
};
