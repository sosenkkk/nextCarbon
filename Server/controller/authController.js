

exports.signup = (req, res, next)=>{
    const email = req.body.email;
    console.log(email)
    const password = req.body.password;
    return res.status(201).json({message:"OLAAAA"})

    
}