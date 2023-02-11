const express=require("express");
const { userSignup, userLogin } = require("../Controller/user.controller");
const userRoutes=express.Router();


userRoutes.post("/signup",userSignup)
userRoutes.post("/login",userLogin)


module.exports={userRoutes}