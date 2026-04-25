const asyncHandler=require("./../utils/asyncHandler")
const User=require("./../models/user.model")
exports.getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find()
    res.status(200).json({
        success:true,
        data:users
    })
})
// get single user controller
exports.getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params._id)
    if(!user){
        res.status(404)
        throw new Error("User not found")
    }
    res.status(200).json({
        success:true,
        data:user
    })
})
// create user controller
exports.createUser=asyncHandler(async(req,res)=>{
    const {displayName,email,uid,photoURL,phoneNumber,role,metadata}=req.body
    const user=await User.create({displayName,email,uid,photoURL,phoneNumber,role,metadata})
    res.status(201).json({
        success:true,
        data:user
    })
})

