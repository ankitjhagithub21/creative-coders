const express = require('express')
const { register, login,getUser } = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken')
const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/user",verifyToken,getUser)

module.exports = authRouter