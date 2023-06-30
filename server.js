const express = require("express")
const app = express()
require("dotenv").config()
const User = require("./model/userModel")
const connectDB = require("./db/config")
const { getUsersController, createUserController, getUserController, upDateUserController, userDeleteController, loginController, profileController } = require("./controllers/userController")

const requireAuth = require("./middleware/auth.middleware")
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")
// connect database
connectDB()

// middlewares
app.use(express.json())
app.use(userRoute)
app.use(postRoute)


//listen on a port
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))





