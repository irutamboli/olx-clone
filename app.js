const express=require("express");
require('dotenv').config()
const mongoose=require("mongoose")
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser = require("cookie-parser")
const authRoutes=require('./routes/auth');
const expressValidator=require("express-validator")// its is used to validate the erros like name
                                                 //should be not empty email should have @
                                                 //password should be min 6 or 8 character etc

//app
const app=express();

//db
mongoose.connect(process.env.DATABASE).then(()=>console.log("db connected"))

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

//routes middleware
app.use('/',authRoutes)

const port=process.env.PORT || 8000
 
app.listen(port,()=>{
    console.log(`sever is running on port ${port}`)
})