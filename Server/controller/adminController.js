const User = require("../model/User");
const Order = require("../model/Order");
const Contacts = require("../model/Contacts");
const Product = require("../model/Product");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: `drlqa8duh`,
  api_key: `858762281996182`,
  api_secret: `Dh5ROsG7lszeA85kUPLVwuupOkA`,
});

// exports.accountInfo = async (req, res, next) => {
//   try {
//     const userId = req.userId;
//     const userInfo = await User.findOne({
//       _id: new mongoose.Types.ObjectId(userId),
//     });
//     if (userInfo) {
//       res
//         .status(202)
//         .json({
//           message: "User data found!",
//           email: userInfo.email,
//           firstName: userInfo.firstName,
//           lastName: userInfo.lastName,
//           cart: userInfo.cart,
//           profile: userInfo.profile
//         });
//     } else {
//       res.status(404).json({ message: "Some Error Happened, User not found" });
//     }
//   } catch (err) {
//     console.log(err);
//     next();
//   }
// };

exports.addProduct = async (req, res, next) => {
  const uploadedFile = req.files.image;
  const productModel = req.body.productModel;
  const productName = req.body.productName;
  const productModelNumber = req.body.productModelNumber;
  const productPrice = req.body.productPrice;
  cloudinary.uploader.upload(
    uploadedFile.tempFilePath,
    { folder: "carbon" },
    async (err, result) => {
      if (err) {
        res.status(433).json({ message: "Some error occured. Try again" });
        console.log(err);
      } else {
        const imageUrl = result.url;
        const product = new Product({
          productModel: productModel,
          productName: productName,
          productModelNumber: productModelNumber,
          productPrice: productPrice,
          productImage: imageUrl,
        });
        const newProduct = await product.save();
        res.status(201).json({ message: "Product Uploaded" });
      }
    }
  );
};

exports.getAddProduct = async (req, res, next) => {
  try {
    res.status(201).json({ message: "User is a admin" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Some error occured" });
  }
};

exports.getEditProduct = async (req, res, next) => {
  const productId = req.params.prodId;
  try {
    const product = await Product.findOne({ _id: productId });
    res.status(201).json({ message: "Product Fetched", product: product });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Some error occured" });
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const productId = req.params.prodId;
    const productModel = req.body.productModel;
    const productName = req.body.productName;
    const productModelNumber = req.body.productModelNumber;
    const productPrice = req.body.productPrice;
    if (req.files) {
      const uploadedFile = req.files.image;
      cloudinary.uploader.upload(
        uploadedFile.tempFilePath,
        { folder: "carbon" },
        async (err, result) => {
          if (err) {
            res.status(433).json({ message: "Some error occured. Try again" });
            console.log(err);
          } else {
            const imageUrl = result.url;
            const product = await Product.findById(productId);
            console.log(product);
            if (product) {
              product.productPrice = productPrice;
              product.productModel = productModel;
              product.productModelNumber = productModelNumber;
              product.productName = productName;
              product.productImage = imageUrl;
              const newProduct = await product.save();
            }
            res.status(202).json({ message: "Product Updated" });
          }
        }
      );
    } else {
      const product = await Product.findById(productId);
      console.log(product);
      if (product) {
        product.productPrice = productPrice;
        product.productModel = productModel;
        product.productModelNumber = productModelNumber;
        product.productName = productName;
        const newProduct = await product.save();
      }
      res.status(202).json({ message: "Product Updated" });
    }
  } catch (err) {
    console.log(err);
    res.status(433).json({ message: "Some error occured" });
  }
};

exports.getRequests = async (req, res, next) => {
  let currentPage = req.query.page || 1;
  let sort;
  if (req.query.sort && req.query.sort != "") {
    sort = req.query.sort;
  }
  try {
    const limit = 5;
    let requests, totalRequests;
    totalRequests = await Contacts.find().countDocuments();
    if (sort) {
      requests = await Contacts.find()
        .populate("user")
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .sort({ createdAt: sort });
    } else {
      requests = await Contacts.find()
        .populate("user")
        .skip((currentPage - 1) * limit)
        .limit(limit);
    }
    res
      .status(201)
      .json({
        message: "Successfully fetched Requests!",
        requests: requests,
        totalRequests: totalRequests,
      });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Requests failed to load!" });
  }
};

exports.getOrders = async (req, res, next) => {
  let currentPage = req.query.page || 1;
  let sort;
  if (req.query.sort && req.query.sort != "") {
    sort = req.query.sort;
  }
  try {
    const limit = 5;
    let orders, totalOrders;
    totalOrders = await Order.find().countDocuments();

    if (sort) {
      orders = await Order.find()
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .sort({ createdAt: sort });
    } else {
      orders = await Order.find()
        .skip((currentPage - 1) * limit)
        .limit(limit);
    }
    if (orders.length > 0) {
      const updatedOrders = orders.map((order) => {
        return {
          user: order.user,
          total: order.total,
          orderPlaced: order.createdAt.toLocaleDateString(),
          id: order._id.toString(),
        };
      });
      res.status(201).json({
        message: "Fetched Orders Successfully.",
        orders: updatedOrders,
        totalOrders: totalOrders,
      });
    } else {
      res.status(404).json({ message: "No orders found." });
    }
  } catch (error) {
    console.log(error);
    res.status(433).json({ message: "Some error occured" });
  }
};

exports.getAllProducts = async (req, res, next) => {
  let currentPage = req.query.page || 1;
  const query = {};
  let sort;
  if (
    req.query.filter &&
    req.query.filter != " " &&
    req.query.filter != "all"
  ) {
    query.productModel = req.query.filter;
  }
  if (req.query.sort && req.query.sort != "") {
    sort = req.query.sort;
  }

  const limit = 8;
  try {
    const totalProducts = await Product.find(query).countDocuments();
    let products;
    if (sort) {
      products = await Product.find(query)
        .sort({ productPrice: sort })
        .skip((currentPage - 1) * limit)
        .limit(limit);
    } else {
      products = await Product.find(query)
        .skip((currentPage - 1) * limit)
        .limit(limit);
    }

    if (products.length != 0) {
      res.status(201).json({
        message: "Products fetched Successfully",
        products: products,
        totalProducts: totalProducts,
      });
    } else {
      throw new Error("failed fetching");
    }
  } catch (err) {
    console.log(err);
    res.status(433).json({ message: "Products fecthing failed" });
  }
};

exports.getSingleOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  console.log(req.params);
  const order = await Order.findById(orderId).populate("user.userId");
  res
    .status(201)
    .json({ message: "Order fetched successfully.", order: order });
};

exports.getRequest = async (req, res, next) => {
  try {
    const reqId = req.params.reqId;
    const request = await Contacts.findOne({ _id: reqId }).populate("user");
    res
      .status(201)
      .json({ message: "Successfully fetched request!", request: request });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Requests failed to load!" });
  }
};

exports.deleteRequest = async (req, res, next) => {
  const reqId = req.params.reqId;
};
