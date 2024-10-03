const express =require('express')

const router =express.Router()//for routes purpose to not to call all in app.js we separated Routes for that
const {
    registerUser,
    loginUser,
    logout,
} = require("../controllers/authController")

router.get("/",function(req,res){
    res.send("hii")
})

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logout);

module.exports=router