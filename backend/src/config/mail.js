import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendOtpMail = async ({to, otp}) => {
  await transporter.sendMail(
    {
      from: process.env.EMAIL,
      to,
      subject: "Reset your password",
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
    }
  )
}