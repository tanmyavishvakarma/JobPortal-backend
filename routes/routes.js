const { request, response } = require('express')
const express=require('express')
const router = express.Router()
const registertemplatecopy=require('../models/registermodels')
const bcryt=require('bcrypt')
const jwt =require('jsonwebtoken')
const postjobtemplatecopy=require('../models/postjobmodels')

router.post('/register',async (request,response)=>{

    const salt=await  bcryt.genSalt(10)
    const securePassword=await bcryt.hash(request.body.password,salt)
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

router.post('/login',async(request,response)=>{
    const registeruser=await registertemplatecopy.findOne({email:request.body.email});
    if(!registeruser) return response.status(400).send('Invalid Email or Password');
    const validatepass=await bcryt.compare(request.body.password,registeruser.password);
    if(!validatepass) return response.status(400).send('Invalid Email or Password');

    const token=jwt.sign({_id: registeruser._id},process.env.TOKEN_SECRET);
    response.header('auth-token',token).send(token)
});

router.post('/postjob',async(request,response)=>{
    const postjob=new postjobtemplatecopy({
        jobtitle:request.body.jobtitle,
        company:request.body.company,
        officelocation:request.body.officelocation,
        jobtype:request.body.jobtype

    })
    postjob.save()
    .then(data=>{
        response.json(data)
    })
    .catch(error=>{
        response.json(error)
    })
});



module.exports=router
