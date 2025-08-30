const express=require("express")
const { addTodo, removeTodo, modifyTodo, getTodo } = require("../controller/Todo.controllers")
const middleawre = require("../middleware/middleware")

const router2=express.Router()
router2.post('/add-todo',middleawre,addTodo)
router2.delete('/remove-todo/:id',middleawre,removeTodo)
router2.put('/update-todo/:id',middleawre,modifyTodo)
router2.get('/get-todo',middleawre,getTodo)
module.exports=router2