const express= require("express")
const app= express()
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userModel=require("./models/user")
const postModel=require("./models/post")
const cookieParser=require('cookie-parser')
const crypto= require('crypto')
const path =require('path')
const multer= require('multer')
const upload=require("./config/multerconfig")

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))




app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/login',(req,res)=>{
    res.render("login")
})

app.post("/register",async(req,res)=>{
    let{username,name,password,age,email}=req.body
    let user =await userModel.findOne({email})
    if(user) return res.status(500).send("user already registered") 

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            let user=await userModel.create({
                name,
                username,
                email,
                password:hash,
                age
            })
            let token=jwt.sign({email:email,userid:user._id},"shhh")
            res.cookie("token",token)
            res.redirect("/index")

        })
        
        
    })
    
    
})
app.post("/login",async(req,res)=>{
    let{password,email}=req.body
    let user =await userModel.findOne({email})
    if(!user) return res.status(500).send("Something Went Wrong") 

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result) {
            let token=jwt.sign({email:email,userid:user._id},"shhh")
            res.cookie("token",token)
            res.status(200).redirect("/profile")
        }
            else res.redirect("/login")
    })
    
    
    
})
function isLoggedIn(req,res,next){
    if(req.cookies.token=="") res.status(500).send("u have to logedIn")  
    else{
        let data =jwt.verify(req.cookies.token,"shhh")
        req.user=data;
    }
    next()
}
app.get('/logout',(req,res)=>{
    res.cookie("token" ,"")
    res.render("index")
})
app.get('/profile', isLoggedIn , async(req,res)=>{
    let user=await userModel.findOne({email: req.user.email}).populate("posts")
    let posts=await postModel.find().populate("user")
    
    console.log(posts)
    
    res.render("profile",{posts,user})
    // console.log(user)
    
   
})
app.post("/post",isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email: req.user.email})
    let {content}=req.body
    let post =await postModel.create({
        user : user._id,
        content
    })
    user.posts.push(post._id)
    await user.save()
    res.redirect("/profile")
    
    
})
app.get('/like/:id',isLoggedIn,async(req,res)=>{
    let post=await postModel.findOne({_id:req.params.id}).populate("user")
    if(post.likes.indexOf(req.user.userid) === -1){ //this used to like and unlike the post with id 
        post.likes.push(req.user.userid)
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1)
    }
    
    await post.save()
    res.redirect("/profile")
})
app.get('/edit/:id',isLoggedIn,async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id})
    res.render('edit',{post})
})


app.post('/update/:id',isLoggedIn,async(req,res)=>{
    
    let post = await postModel.findOneAndUpdate({_id:req.params.id}, {content:req.body.content})
    // post.content.push(post)
    // await post.save()
    res.redirect('/profile')
})

app.get('/profile/upload',(req,res)=>{
    res.render("profileupload")
})

app.post('/upload', isLoggedIn,upload.single("image"),async(req,res)=>{ //for uploading the image to specific user and showing
    let user =await userModel.findOne({email:req.user.email})
    user.profilepic=req.file.filename;
    await user.save()
    res.redirect('/profile')
})








app.listen(3000)
