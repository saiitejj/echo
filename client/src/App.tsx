import { Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Blogs  from "./pages/Blogs"
import { Blog } from "./pages/Blog"
import { Profile } from "./pages/Profile"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Publish } from "./pages/Publish"
function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Blogs />  </ProtectedRoute>} />
      <Route path="/publish" element={<ProtectedRoute><Publish />  </ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
      <Route path={`/blog/:id`} element={<ProtectedRoute> <Blog /> </ProtectedRoute>} />
      
      {/* <Route path="/" element={<div className="text-center font-bold"> Home Page (Coming Soon)</div>}></Route> */}
    </Routes>
  )
}

export default App
