import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const borderColor = "#ddd";
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1)
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className='bg-white rounded-xl shadow-lg w-full p-8 max-w-md'>
        <div className='flex items-center gap-4 mb-4'>
            <IoIosArrowBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/signin")}/>
            <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
        </div>

        {step==1 && 
        <div>
            {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>  
        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={{}}>send OTP</button>  
        </div>
        }

        {step == 2 && 
        <div>
            <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-gray-700 font-medium mb-1"
          >
            OTP
          </label>
          <input
            type="otp"
            id="otp"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter OTP"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
          />
        </div>  
        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={{}}>Verify</button>  
        </div>
        }

        {step == 3 
        && 
        <div>
            <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Enter new password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter new password"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>  

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Confirm new password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="confirm password"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>  
        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={{}}>Reset Password</button>  
        </div>
        }
      </div>
    </div>
  )
}

export default ForgotPassword
