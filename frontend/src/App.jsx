import { Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import ForgotPassword from "./pages/ForgotPassword"
import { ToastContainer } from "react-toastify"
import useGetCurrentUser from "./hooks/useGetCurrentUser"
import { useSelector } from "react-redux"
import useGetCity from "./hooks/useGetCity"


export const serverUrl = "https://food-delivery-2uje.onrender.com/api/"
function App() {
  
  useGetCurrentUser()
  useGetCity()
  const {userData} = useSelector(state => state.user)
  console.log(`User data from useSelector--->`, userData);
  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar= {false}
    />

  <Routes>
    <Route path="/signup" element={!userData ? <SignUp/> : <Navigate to={"/"}/>}></Route>
    <Route path="/signin" element={!userData ? <SignIn/> : <Navigate to={"/"}/>}></Route>
    <Route path="/forgot-password" element={!userData ? <ForgotPassword/>: <Navigate to={"/"}/>}></Route>
    <Route path="/" element={userData? <Home /> : <Navigate to={"/signin"}/>}></Route>
  </Routes>
  </>
  )


}

export default App
