import { Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"
import { ToastContainer } from "react-toastify"
import useGetCurrentUser from "./hooks/useGetCurrentUser"


export const serverUrl = "http://localhost:8000/api/"
function App() {
  
  useGetCurrentUser()
  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar= {false}
    />

  <Routes>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/signin" element={<SignIn/>}></Route>
    <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
  </Routes>
  </>
  )


}

export default App
