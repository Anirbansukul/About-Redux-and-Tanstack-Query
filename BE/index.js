const express=require("express")
const cors=require("cors")
const mongoDB = require("./MongoDB")
const cookie_parser=require("cookie-parser")
const router1 = require("./routes/user.routes")
const router2 = require("./routes/todo.routes")
require("dotenv").config()
const app=express()
mongoDB()
app.use(express.json())
app.use(cors())
app.use(cookie_parser())

app.use("/api/user",router1)
app.use("/api/todo",router2)
app.listen(process.env.PORT,()=>{
    console.log(`Server Run on Port ${process.env.PORT}`);
})