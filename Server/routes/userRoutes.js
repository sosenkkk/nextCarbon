const isAuth = require('../middleware/authMiddleware')
const express = require("express");
const userController = require("../controller/userController")
const router = express.Router();


router.get('/my-account', isAuth,  userController.accountInfo )

router.post('/edit-info', isAuth, userController.editInfo)

router.post('/contact-us', isAuth, userController.contactUs)

router.get('/products', userController.getProducts)

module.exports = router;