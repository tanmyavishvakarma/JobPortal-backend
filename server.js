const express =require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const routes=require('./routes/routes')
const cors=require('cors')

dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},()=>
console.log("database connected")
);

app.use(express.json())
app.use(cors())
app.use('/api',routes)

app.listen(4000,()=>console.log("server running on port 4000"))

module.exports = app;