const isAuth = require('../middleware/authMiddleware')
const express = require("express");
const adminController = require("../controller/adminController")
const router = express.Router();


// router.get('/my-account', isAuth,  adminController.accountInfo )

router.post('/add-product', isAuth, adminController.addProduct)

module.exports = router; 