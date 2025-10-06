import { Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"


export const serverUrl = "http://localhost:8000/api/"
function App() {
  

  return (
  <Routes>
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/signin" element={<SignIn/>}></Route>
    <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
  </Routes>
  )

}

export default App
