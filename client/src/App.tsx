import { Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Blogs  from "./pages/Blogs"
import { Blog } from "./pages/Blog"
function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Blogs />} />
      <Route path={`/blog/:id`} element={<Blog />} />
      
      {/* <Route path="/" element={<div className="text-center font-bold"> Home Page (Coming Soon)</div>}></Route> */}
    </Routes>
  )
}

export default App
