const express = require("express");
const router=express.Router();

const {signup,signin,signout,requireSignin}=require('../controller/auth')
const {userSignupValidator}=require('../validator/index')


router.post('/signup',userSignupValidator, signup);
router.post('/login', signin);
router.get('/logout', signout);




module.exports = router;