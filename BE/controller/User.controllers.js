const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/User.models")
const register = async (req, res) => {
    try{
        const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.send({ status: 0, msg: "Field is required" })
    }
    const hashPass = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashPass })
    await user.save()
    return res.send({ status: 1, msg: "User Registered Successfully" })
    }
    catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}
const login = async (req, res) => {
    try{
        const { email, password } = req.body
    if (!email || !password) {
        return res.send({ status: 0, msg: "Field is required" })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.send({ status: 0, msg: "User Not Found" })
    }
    const checkPass = await bcrypt.compare(password, user.password)
    if (!checkPass) {
        return res.send({ status: 0, msg: "Invalid Password" })
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
    res.cookie("Token", token)
    return res.send({ status: 1, msg: "User Loogedin Successfully", token })
    }
    catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}
const userDetails = async (req, res) => {
    try {
        const { _id } = req.user
        const user = await User.findById( _id )
        return res.send({ status: 1, msg: user })

    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}
module.exports = { register, login,userDetails }