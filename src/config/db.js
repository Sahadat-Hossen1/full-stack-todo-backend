const mongoos=require("mongoose")
const connectDB=async()=>{
    try {
        const conn=await mongoos.connect(process.env.MONGO_URI)
        // //mongodb uri mongodb+srv://admin:<db_password>@todo-cluster.wrcji0v.mongodb.net/?appName=todo-cluster
        // const mongoURI=`mongodb+srv://admin:yYp8gaSo6v9iHaZe@todo-cluster.wrcji0v.mongodb.net/?appName=todo-cluster`
        // const conn=await mongoos.connect(mongoURI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}
module.exports=connectDB