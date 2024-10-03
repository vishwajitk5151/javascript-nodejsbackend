const express=require("express");
const router=express.Router()
const jwt=require("jsonwebtoken")
const isLoggedin=require("../middlewares/isLoggedIn")

router.get("/",function(req,res){
    let error =req.flash("error")//it is comming from the token if not ISlogedin
    res.render("index",{error})

})

router.get("/shop",isLoggedin,function(req,res){
    res.render("shop")

})

module.exports=router