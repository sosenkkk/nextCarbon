const express = require("express");
const {body}= require("express-validator/check")
const authController = require("../controller/authController")
const router = express.Router();

router.post('/signup', authController.signup )

router.post('/login', authController.login )




module.exports = router;




// [
//     body('email').isEmail().withMessage("Please Enter a valid E-mail").custom((value, {req})=>{
//         return 
//     })
// ]