// const mongoose=require('mongoose')
// const config=require("config")
// const dbgr=require("debug")("development:mongoose")


// mongoose
// .connect(`${config.get("MONGODB_URI")}/scatch`)

// .then(function(){
//     dbgr("connected");
// })
// .catch(function(err){
//     dbgr(err);
// })  
// module.exports=mongoose.connection;

// const mongoose=require('mongoose')
// const dbgr=require("debug")("development:mongoose")

// mongoose
// .connect("mongodb://127.0.0.1:27017/scatch")
// .then(function(){
//     dbgr("connected")
// })
// .catch(function(err){
//     dbgr(err) 
// })
// module.exports=mongoose.connection
const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');
require('dotenv').config();

// Check if NODE_ENV is set
if (process.env.NODE_ENV) {
  console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`);
} else {
  console.log('NODE_ENV is not set.');
}

mongoose
  .connect(`${config.get('MONGODB_URI')}/scatch`)
  .then(function () {
    dbgr('connected');
  })
  .catch(function (err) {
    dbgr(err);
  });

module.exports = mongoose.connection;
