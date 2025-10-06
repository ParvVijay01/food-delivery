import axios from "axios";
import React, { useState } from "react";
import { FaDivide, FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
        const result = await axios.post(`${serverUrl}auth/signup`, {
            fullName, email, mobile, password, role
        }, {withCredentials: true});
        
        console.log("results ---> ", result);
        
    } catch (error) {
        console.log(error);
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

        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your full name"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>

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

        {/* Mobile */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your mobile number"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
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
            />
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                className="flex-1 border rounded-md px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? {
                        backgroundColor: primaryColor,
                        color: "white",
                        border: `1px solid ${primaryColor}`,
                      }
                    : {
                        backgroundColor: "white",
                        color: primaryColor,
                        border: `1px solid ${borderColor}`,
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up Button */}
        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignUp}>Sign Up</button>

        {/* Divider with "or" */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm font-medium">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition duration-200 border cursor-pointer border-gray-400 hover:bg-gray-100">
            <FcGoogle size={20}/>
            <span>Sign up with Google</span>
        </button>
        <p className="text-center mt-2" onClick={() => navigate("/signIn")}>Already have an account? <span className="text-[#ff4d2d] cursor-pointer">Sign In</span></p>
      </div>

      
    </div>
  );
}

export default SignUp;
