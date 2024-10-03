const express=require('express')
const router=express.Router()
const ownerModel=require("../models/owner-model")

if(process.env.NODE_ENV==="development"){
    router.get("/create",async function(req,res){
        let owners = await ownerModel.find();
        if(owners.length>0) {
            return res
        .send(503)
        .send("you don,t have permission to create a new Owner")
        }
        let { fullname , email ,password}=req.body
        let createdOwner=await ownerModel.create({
            
            fullname,
            email,
            password
            
            
            
        })
        res.send(201).send(createdOwner)

    })
}






module.exports=router;