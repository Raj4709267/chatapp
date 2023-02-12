const express=require("express");
const { userSignup, userLogin ,userFind} = require("../Controller/user.controller");
const { authentication } = require("../Middlewares/authentication");
const userRoutes=express.Router();


userRoutes.post("/signup",userSignup)
userRoutes.post("/login",userLogin)
userRoutes.get("/find",authentication,userFind)



module.exports={userRoutes}