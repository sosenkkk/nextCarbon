const User = require("../model/User");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: `drlqa8duh`,
  api_key:`858762281996182`,
  api_secret:`Dh5ROsG7lszeA85kUPLVwuupOkA`,
})

exports.accountInfo = async (req, res, next) => {
  try {
    const userId = req.userId;
    const userInfo = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
    if (userInfo) {
      res
        .status(202)
        .json({
          message: "User data found!",
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          cart: userInfo.cart,
          profile: userInfo.profile
        });
    } else {
      res.status(404).json({ message: "Some Error Happened, User not found" });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.editInfo=async( req , res, next)=>{
  const uploadedFile = req.files.image;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userId = req.userId;
  cloudinary.uploader.upload(uploadedFile.tempFilePath,{folder: "carbon"}, async(err, result)=>{
    if(err){
      res.status(433).json({ message: "Some error occured. Try again" });
      console.log(err)
    }else{
      const imageUrl = result.url;
      const user = await User.findById(userId);
      user.profile = imageUrl;
      user.firstName = firstName;
      user.lastName = lastName;
      const updatedUser = await user.save();
      res.status(201).json({message:"User Updated"})
    }
  })
}
