const { request, response } = require('express')
const express=require('express')
const router = express.Router()
const registertemplatecopy=require('../models/registermodels')

router.post('./register',(request,response)=>{
    const registeruser=new registertemplatecopy({
        name:request.body.name,
        email:request.body.email,
        password:request.body.password

    })
    registeruser.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error=>{
        response.json(error)
    })
})

module.exports=router