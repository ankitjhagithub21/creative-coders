require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDb = require('./db')
const authRouter = require('./router/authRouter')
const contactRouter = require('./router/contactRouter')
const serviceRouter = require('./router/serviceRouter')
const app = express()
const port = 3000

connectDb()

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))

app.use('/api/auth',authRouter)
app.use("/api/contact",contactRouter)
app.use("/api/service",serviceRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})