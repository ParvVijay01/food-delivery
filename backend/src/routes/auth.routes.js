import express from "express"
import { googleAuth, resetPassword, sendOtp, signIn, signOut, signUp, verifyOTP } from "../controllers/auth.controllers.js"

const authRouter = express.Router()

authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)
authRouter.get("/sign-out", signOut)
authRouter.post("/send-otp", sendOtp)
authRouter.post("/verify-otp", verifyOTP)
authRouter.post("/reset-password", resetPassword)
authRouter.post("/google-auth", googleAuth)

export default authRouter