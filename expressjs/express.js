//framework
//npm package
// manages receving and giving back the response



//  1)  setting the basic app in the express js
//  2) routing
/*const express = require('express')
const app = express()// creates Route like facebook.com/ etc

app.get('/', function (req, res) { //app.get(route,requesthandler)
  res.send('Hello Worlds');
})

app.get('/profile',function(req,res){

    res.send('champion uska coach');
})

app.listen(3000)*/

//middleware:it works between the server and the req
/*const express= require('express')
const app = express()

app.use(function(req,res,next){
    console.log("middle ware is performing")
    next();
})
app.use(function(req,res,next){
    console.log("middle ware is performing one more time")
    next();
})*/
     //one more type of writing middleware
     //one timer code all
     /*app.use('/moretype',function(req,res,next){
        console.log("hello")
        res.send('user')
        next();
     })
     app.use('/user/:id', ( err,req, res, next) => {
        console.log('Request URL:', req.originalUrl)
        res.send("first page ")
        res.send("second page")
        console.error(errstack)
        res.status(500).send('something wrong')
        next()
      }, (err,req, res, next) => {
        console.log('Request Type:', req.method)
        res.send("second page")
        
        next()
      })
    //response handled
app.get('/', function (req, res) { 
  res.send('Hello Worlds');
})
app.get('/about', function (req, res) { 
    res.send('Hello Worlds aboutpage');
  })

app.listen(3000)*/

//handaling error

const express= require('express')
const app = express()

app.get("/profile",function(req,res,next){
    return next(new Error("someting went wrong"))
    
});
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('someting broke!')
})
app.listen(3000);



