import { useEffect,useState } from "react";

import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog{
    "content":string,
    "title":string,
    id:number,
    "authorId":number,
    
    "author":{
        "name":string
    },
    "createdAt":string
    
}

export const useBlogs=()=>{
    const [loading,setLoading]=useState(true)
    const [blogs,setBlogs]=useState<Blog[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/posts`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response=>{
            console.log("The data is",response.data)
            setBlogs(response.data)
            setLoading(false)
        })
    },[])
    return{
        loading,
        blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>(); 

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/posts/${id}`, { 
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(response => {
                setBlog(response.data); 
                setLoading(false);
            })
    }, [id])

    return { loading, blog }
}