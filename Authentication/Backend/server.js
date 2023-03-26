require("dotenv").config();
const express = require("express");
const {connection} = require("./configure/config");
const app = express();
const {userRouter} = require("./routes/users.route")
const {port} = process.env

app.use("/users",userRouter);

app.listen(port,()=>{
console.log(`server start on ${port}`)
});