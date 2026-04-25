const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
// config dotenv and cors and express json
dotenv.config();
app.use(cors());
app.use(express.json());

// Add COOP/COEP headers for Firebase popup auth
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
// import routes and middleware
const todoRouter = require("./routers/todo.router");
const userRouter=require("./routers/user.router")
const errorHandler = require("./middleware/error.middleware");
// routes
app.use("/api/todos", todoRouter);
app.use("/api/users", userRouter);
// error handler
app.use(errorHandler);
module.exports = app;
