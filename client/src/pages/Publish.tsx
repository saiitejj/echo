import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
interface CreateBlogInput {
    title: string;
    content: string;
}
export const Publish=()=>{
    const [title,setTitle]=useState<string>("")
    const [content,setContent]=useState<string>("")
    const navigate=useNavigate()
    const [searchParams]=useSearchParams()
    const isEdit=searchParams.get("edit")==="true"
    const blogId=searchParams.get("id")
    const [pageLoading, setPageLoading] = useState(isEdit);
    
    useEffect(() => {
        if (isEdit && blogId) {
            axios.get(`${BACKEND_URL}/api/posts/${blogId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            }).then(response => {
                setTitle(response.data.title); 
                setContent(response.data.content);
                setPageLoading(false); 
            });
        }
    }, [isEdit, blogId]);
    if (pageLoading) {
        return <div className="h-screen flex justify-center items-center">
            <Spinner /> 
        </div>
    }
    const handlePublish = async () => {
        const postData: CreateBlogInput = { title, content };
        const authHeader = { 
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } 
        };

        try {
            if (isEdit) {
                await axios.put(`${BACKEND_URL}/api/posts/${blogId}`, postData, authHeader);
                alert("Echo Updated!");
                navigate(`/blog/${blogId}`);
            } else {
                const response = await axios.post(`${BACKEND_URL}/api/posts`, postData, authHeader);
                navigate(`/blog/${response.data.id}`);
            }
        } catch (error) {
            console.error("Error: ",error)
            alert("Action failed. Please try again.");
        }
    };
    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8 ">
                <div className="max-w-screen-lg w-full px-10 ">
                    <input 
                        type="text"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        className="w-full text-gray-900 text-5xl font-bold outline-none placeholder:text-gray-300"
                        placeholder="Title"
                    />
                    <div className="mt-4 border rounded-lg p-4 ">
                        <textarea 
                            placeholder="Tell your story..." 
                            rows={10}
                            value={content}
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
                                {isEdit ? "Update Echo" : "Publish Echo"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}