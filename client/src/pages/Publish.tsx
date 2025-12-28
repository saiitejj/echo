import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CreateBlogInput {
    title: string;
    content: string;
}
export const Publish=()=>{
    const [title,setTitle]=useState<string>("")
    const [content,setContent]=useState<string>("")
    const navigate=useNavigate()

    const handlePublish = async () => {
        const postData: CreateBlogInput = {
            title,
            content
        };

        try {
            const response = await axios.post(`${BACKEND_URL}/api/posts`, postData, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem("token")}` 
                }
            });

            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error(error)
            alert("Failed to publish your Echo. Please try again.");
        }
    }
    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8 ">
                <div className="max-w-screen-lg w-full px-10 ">
                    <input 
                        type="text"
                        onChange={(e)=>setTitle(e.target.value)}
                        className="w-full text-gray-900 text-5xl font-bold outline-none placeholder:text-gray-300"
                        placeholder="Title"
                    />
                    <div className="mt-4 border rounded-lg p-4 ">
                        <textarea 
                            placeholder="Tell your story..." 
                            rows={10}
                            onChange={(e)=>setContent(e.target.value)}
                            className="block bg-gray-800 w-full text-lg text-gray-800 bg-white border-0 focus:outline-none placeholder:text-gray-300 resize-none"
                            >
                            
                        </textarea>

                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handlePublish}
                            type="submit"
                            className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-center text-white bg-[#273F4F] rounded-full hover:bg-[#273F4F]/80 cursor-pointer focus:ring-1 focus:ring-[#273F4F]/90 transition-all "
                            >
                                Publish Echo
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}