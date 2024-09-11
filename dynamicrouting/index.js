//dynamicrouting
//how to get data coming from frontend at backend route
//setting up parsers for form
//setting up ejs for ejs pages
     //install ejs
     //setup ejs as a view engine
//setting up public staic files
//ejs is like html with dynamic funtinality




const express= require('express');
const app= express();
const path = require ('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');

app.get("/", function (req ,res){
    res.render("index"); //render content from the ejs page from views model
});

app.listen(3000,function(){console.log("its running")});