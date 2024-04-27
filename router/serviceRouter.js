const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { addService, deleteService, getAllServices } = require('../controllers/serviceController')
const serviceRouter = express.Router()


serviceRouter.post("/add",verifyToken,addService)
serviceRouter.delete("/delete/:serviceId",verifyToken,deleteService)
serviceRouter.get("/",getAllServices)

module.exports = serviceRouter