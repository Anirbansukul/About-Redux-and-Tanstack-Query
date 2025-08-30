const express=require("express")
const { register, login, userDetails } = require("../controller/User.controllers")
const middleawre = require("../middleware/middleware")
const router1=express.Router()
router1.post('/register',register)
router1.post('/login',login)
router1.get('/user-details',middleawre,userDetails)
module.exports=router1