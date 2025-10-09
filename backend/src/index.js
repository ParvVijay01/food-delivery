import express from "express"
import dotnev from "dotenv"
dotnev.config()
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import shopRouter from "./routes/shop.routes.js"
import itemRouter from "./routes/item.routes.js"

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
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)

app.use("/", (req,res) => {
    res.send("Hello")
})

app.use("/public", express.static("public"))

app.listen(PORT, (req,res) => {
    connectDB()
    console.log(`Listening on port ${PORT}`)
})