const express =require('express')
const app = express()
const path= require('path')
const userModel= require('./models/user')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render("index")

})
app.get("/read",async(req,res)=>{
    let users =await userModel.find();
    res.render("read",{users})
})

app.post("/create", async (req,res)=>{
    let {name,email,image}= req.body
    let createdUser=await userModel.create({
        name, //name:name
        email, //email:email
        image

    })
    res.redirect("/")
})
app.post("/update/:id", async (req,res)=>{
    let {name,email,image,}= req.body
    let updateduser=await userModel.findOneAndUpdate({_id: req.params.id},{email,name,image},{new:true})
    //((findone),(update),(new:true))
    
    res.redirect("/read")
})


app.get("/delete/:id",async(req,res)=>{  // it is use to get user id with the server
    let users =await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read")
})
app.get("/edit/:id",async(req,res)=>{  // it is use to get user id with the server
    let user=await userModel.findOne({_id:req.params.id})    
    res.render("edit",{user})
})

app.listen(3000)