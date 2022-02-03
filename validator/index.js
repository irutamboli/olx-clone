exports.userSignupValidator=(req,res,next)=>{
    req.check('name','Name is required')
    .notEmpty()//name should be present 

    req.check('email','email must be 3-32 characters ')
    .matches(/.+\@.+\..+/) //@symbol should be present in the email input
    .withMessage('Email must contain @')
    .isLength({
        min:4,
        max:32
    })
    req.check('password',"password is required")
    .notEmpty()//password is required
    req.check('password')
    .isLength({
        min:6
    })// length min limit is specified here
    .withMessage("password should contain atleast 6 character")
    .matches(/\d/) //pass should have atleast a digit or num
    .withMessage('password must conatin a number');
    const errors=req.validationErrors()
    if(errors){
        const firstError = errors.map(error=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    next()
}