const isAuth = require("../middleware/authMiddleware");
const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/my-account", isAuth, userController.accountInfo);

router.post("/edit-info", isAuth, userController.editInfo);

router.post("/contact-us", isAuth, userController.contactUs);

router.post("/cart", isAuth, userController.postCart);

router.get("/cart", isAuth, userController.getCart);

router.get("/products", userController.getProducts);

router.get("/delete-cart", isAuth, userController.deleteCart);

router.get("/delete/:cartId", isAuth, userController.deleteFromCart);

module.exports = router;
