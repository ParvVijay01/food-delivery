import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"
import { sendOtpMail } from "../config/mail.js"

export const signUp = async (req,res) => {
    try {
        const {fullName, email, password, mobile, role} = req.body
        
        let user = await User.findOne({email}) 
        const mobileNumber = await User.findOne({mobile})

        if(user || mobileNumber){
            return res.status(400).json({message: "User email or number already exist"})
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters long"})
        }

        if(mobile.length < 10){
            return res.status(400).json({message: "Mobile number must be 10 digits long"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password: hashedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false, //false till the code is in development, change it to true when the server is deployed.
            sameSIte: "strict",
            maxAge: 7*24*60*60*1000, //7 days, 24 hours, 60 min, 60 secs, 1000 millieseconds 
            httpOnly: true
        })

        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(`sign up error: ${error}`)
    }
}

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "User doest not exist, please sign up."})
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched){
            return res.status(400).json({message: "Invalid password"})
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false, 
            sameStie: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json(`Sign in error: ${error}`)
    }
} 

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "Sign out successfully"})
    } catch (error) {
        return res.status(500).json(`Sign out error: ${error}`)
    }
}

export const sendOtp = async (req,res) => {
    try {
        const {email} = req.body
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires = Date.now() + 5*60*1000 //expires in 5 minutes
        user.isOtpVerified = false

        await user.save()
        await sendOtpMail({to: email, otp: otp});

        return res.status(200).json({message: "OTP sent successfully"})
    } catch (error) {
        console.log(`Error in sending otp: ${error}`);
        
    }
}

export const verifyOTP = async (req,res) => {
    try {
        const {email, otp} = req.body
        let user = await User.findOne({email})
        if(!user || user.resetOtp != otp || user.otpExpires < Date.now()){
            return res.status(400).json({message: "Invalid OTP"})
        }
        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save();
        return res.status(200).json({message: "OTP verified successfully"})
    } catch (error) {
        console.log(`Error in verifying OTP: ${error}`);
    }
}

export const resetPassword = async (req,res) => {
    try {
        const {email, password} = req.body
        let user = await User.findOne({email})
        if(!user || !user.isOtpVerified) {
        return res.status(400).json({message: "OTP verification required"})
        }

        const hashedPassword =await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save();
        return res.status(200).json({message: "Password reset successful"})
    } catch (error) {
        console.log(`Reset error: ${error}`);
        
    }
}