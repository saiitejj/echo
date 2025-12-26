import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";

interface SignInput {
    email: string;
    password: string;
}
export default function Login(){
    const navigate=useNavigate()
    const handleLogin=async(data:SignInput)=>{
        try{
            const response=await axios.post(`http://localhost:5000/api/users/login`,data)
            const token=response.data.token;
            localStorage.setItem("token",token)
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