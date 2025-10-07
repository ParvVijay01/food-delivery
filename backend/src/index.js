import express from "express"
import dotnev from "dotenv"
dotnev.config()
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import userRouter from "./routes/user.routes.js"

const app = express()
const PORT = process.env.PORT || 8000

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.listen(PORT, (req,res) => {
    connectDB()
    console.log(`Listening on port ${PORT}`)
})