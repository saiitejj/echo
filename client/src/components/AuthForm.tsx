import { Link } from "react-router-dom";
import { useState } from "react";

interface SignupInput {
    name?: string; 
    email: string;
    password: string;
}

interface AuthFormProps{
    type: 'login' | 'register'
    onSubmit:(data: SignupInput)=> void;
}

export default function AuthForm({type,onSubmit}:AuthFormProps){
    const [postInputs,setPostInputs]=useState({
        name:"",
        email:"",
        password:""
    })

    return (
        <div className="h-screen flex justify-center flex-col items-center bg-slate-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="text-center text-1xl">
                    {type==='register'? (
                        <h1 className="font-bold text-3xl">Join <span className="text-[#1C4D8D] text-3xl font-bold">Echo</span></h1>) :
                        (<h1 className="font-bold text-3xl"><span className="text-[#1C4D8D] text-3xl font-bold">Echo</span></h1>)}
                    {type==='register'?'Stories start here':'Welcome back!!'}
                </div>
                <div className="space-y-4">
                    {type==='register'? (
                        <div>
                            <label htmlFor="name" className="block mb-2 text-md font-bold text-black">Name</label>
                            <input 
                                type="text"
                                placeholder="Echo Display Name" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                onChange={(e)=> setPostInputs({ ...postInputs,name:e.target.value})}
                            />
                        </div>
                    ):null}

                    <div>
                        <label htmlFor="email" className="block mb-2 text-md font-bold text-black">Email</label>
                        <input 
                                type="text"
                                placeholder="Echo email" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                onChange={(e)=> setPostInputs({ ...postInputs,email:e.target.value})}
                            />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-md font-bold text-black">Password</label>
                        <input 
                                type="password"
                                placeholder="Echo password" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                onChange={(e)=> setPostInputs({ ...postInputs,password:e.target.value})}
                            />
                    </div>
                    <button
                        onClick={()=>onSubmit(postInputs)}
                        className="w-full bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 font-bold transition-colors"
                        >
                            {type==="register"?"Sign Up":"Login"}

                    </button>
                    
                    

                </div>
                <div className="text-center text-sm mt-4 text-gray-500">
                    {type==='login'?"Don't have an account?":"Already have an account?"}
                    <Link
                        className="pl-2 underline text-black font-medium"
                        to={type==="login"?"/register":"/login"}
                        >
                            {type==="login"?"Register":"Login"}
                    </Link>

                </div>


            </div>
        </div>
    )
}