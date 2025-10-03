import express from "express"
import dotnev from "dotenv"
import connectDB from "./config/db.js"
dotnev.config()

const app = express()
const PORT = process.env.PORT || 5000



app.listen(PORT, (req,res) => {
    connectDB()
    console.log(`Listening on port ${PORT}`)
})