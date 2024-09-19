const express = require('express')
const app =express()
const userModel=require("./models/user")
const postModel=require("./models/post")


app.get("/",(req,res)=>{
    res.send("hey")
})
app.get('/create',async(req,res)=>{
    let user=await userModel.create({
        username:"vsk",
        age:25,
        email:"vsk@gamil"

    })
    res.send(user)
    
})
app.get('/post/create',async(req,res)=>{
    let post=await postModel.create({
        postdata:"hello kese ho",
        user:"66e72cc84ae04406af5fb193"
        

    })
    let user= await userModel.findOne({_id:"66e72cc84ae04406af5fb193"});
    user.posts.push(post._id);
    await user.save()
    res.send({post,user})
    
})

app.listen(3000)
