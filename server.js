const express =require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')


dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>
console.log("database connected")
);


app.listen(4000,()=>console.log("server running on port 4000"))