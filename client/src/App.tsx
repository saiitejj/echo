import { Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      {/* <Route path="/" element={<div className="text-center font-bold"> Home Page (Coming Soon)</div>}></Route> */}
    </Routes>
  )
}

export default App
