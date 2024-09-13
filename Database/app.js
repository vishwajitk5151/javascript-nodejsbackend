const express = require('express')
const app = express()
const userModel = require('./usermodel')



app.get("/",(req,res)=>{
    res.send("hello")
})
app.get("/create", async (req,res)=>{
   let createduser=await userModel.create({
        name: "harshik",
        email:"harshiks@gmail",
        username:"harshiks12"
    })
    res.send(createduser)
})
app.get("/update", async (req,res)=>{
    let updateduser=await userModel.findOneAndUpdate({username:"harshiks12"},{name:"harsh vandana sharma"},{new:true})
    //((findone),(update),(new:true))
    res.send(updateduser)
 })
 app.get("/read",async(req,res)=>{
    let userFind =await userModel.find({})
    res.send(userFind)
 })
 app.get("/delete",async(req,res)=>{
    let userdelete =await userModel.findOneAndDelete({name:"harsh"})
    res.send(userdelete)
 })



app.listen(3000)