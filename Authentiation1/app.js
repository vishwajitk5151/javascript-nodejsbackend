// const cookieParser = require('cookie-parser')
// const express = require('express')
// const app=express()

// app.use(cookieParser())
// app.get("/", (req,res)=>{
//     res.cookie("name","harsh"); // set cookie
//     res.send("Done")
// })
// app.get("/read", (req,res)=>{
//     console.log(req.cookies) //read cookie bu req
//     res.send("read page")
// })
// app.listen(3000)



        //bcrypt

// const express = require('express')
// const app=express()
// const bcrypt = require('bcrypt')

// app.get("/",(req,res)=>{
// //     bcrypt.genSalt(10, function(err, salt) {
// //         bcrypt.hash("polololo", salt, function(err, hash) {//incryption
// //             console.log(hash)
// //         });
// //     });
// // })
// bcrypt.compare("polololo", "$2b$10$TZUt2SxwBeNowvDQFb7YwO.M33eViTHi2PEQ5uf1cpoGx2BFwAXnq", function(err, result) {
//     console.log(result)
// });
// })

// app.listen(3000)

const express=require('express')
const app= express()
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get("/", (req,res)=>{
    let token=jwt.sign({email:"harsh@gmail.com"}, "secret")
    res.cookie("token",token)
    res.send('hi')

})
// app.get("/read", (req,res)=>{
//     console.log(req.cookies.token)

// })
app.get("/read", (req,res)=>{
    let data=jwt.verify(req.cookies.token, "secret")
    console.log(data)

})
app.listen(3000)