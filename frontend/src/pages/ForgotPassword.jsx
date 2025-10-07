import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import {ClipLoader} from "react-spinners"

function ForgotPassword() {
  const borderColor = "#ddd";
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState("")

  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if(!email) {
      toast.error("Please enter your email")
      return
    }
    setIsLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}auth/send-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      console.log(`send otp result ---> ${result}`);

      if (result.status === 200) {
        toast.success("OTP sent successfully");
        setStep(2);
      }
      setErr("")
    } catch (error) {
      console.log(`Error in sending otp ---> ${error}`);
      toast.error(error.response?.data?.message || "Error in sending OTP");
      setErr(error.response?.data?.message || "Error in sending OTP")
     
    }finally{
      setIsLoading(false)
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(`Verify otp result ---> ${result}`);
      if (result.status === 200) {
        toast.success("OTP verified");
        setStep(3);
      }
      setErr("")
    } catch (error) {
      console.log(`Error in verifying OTP: ${error}`);
      toast.error(error.response?.data?.message || "Invalid OTP");
      setErr(error.response?.data?.message || "Invalid OTP")
    }
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const result = await axios.post(
        `${serverUrl}auth/reset-password`,
        { email, password },
        { withCredentials: true }
      );
      console.log(`Reset password result ---> ${result}`);
      if (result.status === 200) {
        navigate("/signin");
        toast.success("Password reset successful");
      }
      setErr("")
    } catch (error) {
      console.log(`Error in reseting password: ${error}`);
      toast.error(error.response?.data?.message);
      setErr(error.response?.data?.message)
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full p-8 max-w-md">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {step == 1 && (
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
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleSendOTP}
              disabled={isLoading}
            >
              {isLoading ? (<ClipLoader color="#ffffff" size={20} />) : ("Send OTP")}
              
            </button>
            {err && (
          <p className="text-red-500 text-center my-1">*{err}</p>
        )}

          </div>
        )}

        {step == 2 && (
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
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleVerifyOTP}
            >
              Verify
            </button>
            {err && (
          <p className="text-red-500 text-center my-1">*{err}</p>
        )}

          </div>
        )}

        {step == 3 && (
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
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
            {err && (
          <p className="text-red-500 text-center my-1">*{err}</p>
        )}

          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
