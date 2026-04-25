const express=require("express")
const router=express.Router()
const userController=require("../controllers/users.controller")
router.get("/",userController.getUsers)
router.get("/:_id",userController.getUser)
router.post("/",userController.createUser)
module.exports=router