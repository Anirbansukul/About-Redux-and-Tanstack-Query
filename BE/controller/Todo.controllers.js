const Todo = require("../model/Todo.models")

const addTodo = async (req, res) => {
    try {
        const { name } = req.body
        const { _id } = req.user
        if (!name) {
            return res.send({ status: 0, msg: "Field is required" })
        }
        const todo = new Todo({ name, user: _id })
        await todo.save()
        return res.send({ status: 1, msg: "Todo Add Successfully" })
    }
    catch (error) {
        return res.send({ status: 0, msg: error.msg })
    }
}
const removeTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { _id } = req.user
        const todo = await Todo.findById(id)
        if (todo.user.toString() === _id.toString()) {
            if (!todo) {
                return res.send({ status: 0, msg: "Todo Not Found" })
            }
            await Todo.deleteOne({ _id: id })
            return res.send({ status: 1, msg: "Todo Removed Successfully" })
        }

    } catch (error) {
        return res.send({ status: 0, msg: error.msg })
    }
}
const modifyTodo = async (req, res) => {
    try {
        const { name } = req.body
        const { _id } = req.user
        const { id } = req.params
        if (!name) {
            return res.send({ status: 0, msg: "Field is required" })
        }
        const todo = await Todo.findById(id)
        if (todo.user.toString() === _id.toString()) {
            if (!todo) {
                return res.send({ status: 0, msg: "Todo Not Found" })
            }
            await Todo.updateOne({ _id: id }, { $set: { name } })
            return res.send({ status: 1, msg: "Todo Updated Successfully" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.msg })
    }
}
const getTodo = async (req, res) => {
    try {
        const { _id } = req.user
        const todo =await Todo.find({ user: _id })
        res.send({ status: 1, msg: todo })
    } catch (error) {
        return res.send({ status: 0, msg: error.msg })
    }
}
module.exports = { addTodo, removeTodo, modifyTodo, getTodo }