const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
   
    isCompleted:{
        type:Boolean,
        default:false
    },
    userUID:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
module.exports=mongoose.model("Todo",todoSchema)
