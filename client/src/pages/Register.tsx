import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";

interface SignupInput {
    name?: string; 
    email: string;
    password: string;
}
export default function Register(){
    const navigate=useNavigate()
    const handleRegister=async(data:SignupInput)=>{
        try{
            await axios.post(`http://localhost:5000/api/users/register`,data)
            alert("Registration Successful!")
            navigate("/login")
        }catch(error){
            console.error(error)
            alert("Error while signing up")
        }
    }
    return(
        <div>
            <AuthForm type="register" onSubmit={handleRegister}/>
        </div>
    )
}