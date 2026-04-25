const asyncHandler=require("./../utils/asyncHandler")
const Todo=require("./../models/todo.model")

// create  Todo controller
exports.createTodo=asyncHandler(async(req,res)=>{
    const {title,isCompleted,userUID}=req.body
    if(!title){
        res.status(400)
        throw new Error("Title is required")
    }
    const todo=await Todo.create({title,isCompleted,userUID})
    res.status(201).json({
        success:true,
        data:todo
    })
})

// get all todos controller
exports.getTodos=asyncHandler(async(req,res)=>{
    const todos=await Todo.find()
    res.status(200).json({
        success:true,
        data:todos
    })
})
// get single todo controller
exports.getTodo=asyncHandler(async(req,res)=>{
    const todo=await Todo.findById(req.params._id)
    if(!todo){
        res.status(404)
        throw new Error("Todo not found")
    }
    res.status(200).json({
        success:true,
        data:todo
    })
})
// update todo controller
exports.updateTodo=asyncHandler(async(req,res)=>{
    const {title,isCompleted}=req.body
    const todo=await Todo.findById(req.params._id)
    if(!todo){
        res.status(404)
        throw new Error("Todo not found")
    }
    todo.title=title || todo.title
    todo.isCompleted=isCompleted!==undefined?isCompleted:todo.isCompleted
    await todo.save()
    res.status(200).json({
        success:true,
        data:todo
    })
})
// delete todo controller
        exports.deleteTodo=asyncHandler(async(req,res)=>{
            const todo=await Todo.findById(req.params._id)
            if(!todo){
                res.status(404)
                throw new Error("Todo not found")
            }
            await todo.remove()
            res.status(200).json({
                success:true,
                data:null
            })
        })