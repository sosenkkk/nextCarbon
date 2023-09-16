const isAuth = require('../middleware/authMiddleware')
const express = require("express");
const userController = require("../controller/userController")
const router = express.Router();


router.get('/my-account', isAuth,  userController.accountInfo )


module.exports = router;