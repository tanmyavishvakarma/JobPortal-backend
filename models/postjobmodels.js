const mongoose=require('mongoose')

const postjobtemplate= new mongoose.Schema({
    jobtitle:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    officelocation:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("postjobtable",postjobtemplate)