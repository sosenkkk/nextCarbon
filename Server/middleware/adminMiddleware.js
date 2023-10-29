const User = require("../model/User")

module.exports = async(req, res, next) => {
  console.log("helo")
  const userId = req.userId;
  const user = await User.findOne({_id:userId});

  if(user.isAdmin){
    next();
  }else{
    res.status(404).json({message:"Not an admin!"})
  }
};
