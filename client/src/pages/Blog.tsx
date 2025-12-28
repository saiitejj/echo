import { Spinner } from "../components/Spinner";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

import axios from "axios";
export const Blog=()=>{
    const {id}=useParams()
    const {loading,blog}=useBlog({
        id:id || ""
    })
    const navigate=useNavigate()
    const onDelete = async () => {
        const confirmation = globalThis.confirm("Are you sure you want to delete this Echo?");
        if (!confirmation) return;

        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            alert("Echo deleted successfully");
            navigate("/blogs");
        } catch (error) {
            console.error(error)
            alert("Error while deleting post");
        }
    };
    if (loading || !blog){
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog}
            onDelete={onDelete}
            onEdit={()=>navigate(`/publish?edit=true&id=${blog.id}`)}
        />
    </div>
}