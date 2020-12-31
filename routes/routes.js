const { request, response } = require('express')
const express=require('express')
const router = express.Router()
const registertemplatecopy=require('../models/registermodels')
const bcryt=require('bcrypt')

router.post('/register',async (request,response)=>{

    const saltPassword=await  bcryt.genSalt(10)
    const securePassword=await bcryt.hash(request.body.password,saltPassword)
    const registeruser=new registertemplatecopy({
        name:request.body.name,
        email:request.body.email,
        password:securePassword

    })
    registeruser.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error=>{
        response.json(error)
    })
});

module.exports=router