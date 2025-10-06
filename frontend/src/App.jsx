import { Routes, Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

function App() {
  

  return (
  <Routes>
    <Route path="/signup" elemant={<SignUp/>}></Route>
    <Route path="/signin" elemant={<SignIn/>}></Route>
  </Routes>
  )

}

export default App
