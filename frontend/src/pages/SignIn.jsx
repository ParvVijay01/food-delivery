import axios from "axios";
import React, { useState } from "react";
import { FaDivide, FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth}  from "../../firebase"

function SignIn() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState("")

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if(!email || !password){
      toast.error("All the fileds are required")
      return
    } 
    setIsLoading(true)
    try {
        const result = await axios.post(`${serverUrl}auth/sign-in`, {
            email, password,
        }, {withCredentials: true});
        
        console.log("results ---> ", result);
        if(result.status == 200 || result.status == 201){
          toast.success("Sign In successfull")
          navigate("/home")
        }
        setErr("")
        
    } catch (error) {
        console.log(error);
        setErr(error.response.data.message)
        toast.error(error.response?.data?.message);
        
    } finally{
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      
      const {data} = await axios.post(`${serverUrl}auth/google-auth`, {
        email: result.user.email,
        type: 'signin' // Specify this is for signin
      }, {withCredentials: true})
      
      console.log(data);
      toast.success("Google sign in successful!")
      navigate("/home")
      setErr("")
      
    } catch (error) {
      console.log(`Google auth error: ${error}`);
      const errorMessage = error.response?.data?.message || "Google sign in failed"
      toast.error(errorMessage)
      setErr(errorMessage)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2 text-center`}
          style={{ color: primaryColor }}
        >
          FOOD DELIVERY
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Create your account to get started with delicious food deliveries
        </p>

        

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
            required
          />
        </div>

        

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your password"
                style={{ border: `1px solid ${borderColor}` }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        <div onClick={() => navigate("/forgot-password")} className="text-right mb-3 font-medium cursor-pointer text-[#ff4d2d]">Forgot Password</div>

        

        {/* Sign In Button */}
        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignIn} disabled={isLoading}>{isLoading ? (<ClipLoader color="#FFFFFF" size={20}/>) :  ("Sign In")}</button>
        {/* Error Message */}
        {err && (
          <p className="text-red-500 text-center my-1">*{err}</p>
        )}

        {/* Divider with "or" */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm font-medium">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition duration-200 border cursor-pointer border-gray-400 hover:bg-gray-100" onClick={handleGoogleAuth}>
            <FcGoogle size={20}/>
            <span>Sign in with Google</span>
        </button>
        <p className="text-center mt-2" onClick={() => navigate("/signUp")}>Don't have an account? <span className="text-[#ff4d2d] cursor-pointer">Sign Up</span></p>
      </div>

      
    </div>
  );
}

export default SignIn;
