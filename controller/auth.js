const User=require('../models/user')
const jwt=require('jsonwebtoken') //to generate token
const expressJwt=require('express-jwt')//for authorization check
const {errorHandler}=require("../helpers/dbErrorhandler")

exports.signup=(req,res)=>{
    console.log(req.body)
   const user = new User(req.body)
   user.save((err,user)=>{
if(err){
    return res.status(400).json({
        error:errorHandler(err)
    })
}
user.salt=undefined  // password and salt will not be shown in response
user.hashed_password=undefined
res.json({user})
   })
};




exports.signin=(req,res)=>{
//find user based on email
const{email,password}=req.body
User.findOne({email},(err,user)=>{
    if(err||!user){
        return res.status(400).json({
            err:'user with this email doesnot exit, Pls signup'
        })
    }
    //if user is found make sure the email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)){
        return res.status(400).json({
            error:'Email and password donot match'
        })
    }
    //generate a signed token with user id and secret key
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)

    //persist the token as "t" in cookie with expiry date

    res.cookie('t',token,{expire: new Date()+9999})

    //return response with user and token to frontend client
    const{_id, name,email,role}=user //destructuring
    return res.json({token,user:{_id,name,email,role}}) //in response we will receive only these params
})
}


exports.signout=(req,res)=>{
   res.clearCookie('t')
   res.json({message:'signout success'}) 
}


//only logged in person can have access
exports.requireSignin=expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms: ["RS256"],//
    userProperty:"auth"
})


