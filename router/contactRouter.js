const express = require('express')
const { sendMessage, getAllMessage } = require('../controllers/contactController')
const contactRouter = express.Router()

contactRouter.post("/new",sendMessage)
contactRouter.get("/",getAllMessage)

module.exports = contactRouter