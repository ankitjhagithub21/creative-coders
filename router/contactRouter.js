const express = require('express')
const { sendMessage } = require('../controllers/contactController')
const contactRouter = express.Router()

contactRouter.post("/new",sendMessage)

module.exports = contactRouter