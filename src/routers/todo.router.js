const express=require("express")
const router=express.Router()
const todoController=require("../controllers/todos.controller")

// routes
router.post("/",todoController.createTodo)
router.get("/",todoController.getTodos)
router.get("/:_id",todoController.getTodo)
router.put("/:_id",todoController.updateTodo)

router.delete("/:_id",todoController.deleteTodo)

module.exports=router