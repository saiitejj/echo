import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import { BACKEND_URL } from "../config";
interface SignInput {
    email: string;
    password: string;
}
export default function Login(){
    const navigate=useNavigate()
    const handleLogin=async(data:SignInput)=>{
        try{
            const response=await axios.post(`${BACKEND_URL}/api/users/login`,data)
            const jwt=response.data.token;
            localStorage.setItem("token",jwt)
            localStorage.setItem("authorName",response.data.user.name || "Anonymous")
            localStorage.setItem("authorEmail",response.data.user.email || "No Email")
            localStorage.setItem("userId",response.data.user.id)

            alert("Login Successful!")
            navigate("/")
        }catch(error){
            console.error(error)
            alert("Error while logging in")
        }
    }
    return(
        <div>
            <AuthForm type="login" onSubmit={handleLogin}/>
        </div>
    )
}