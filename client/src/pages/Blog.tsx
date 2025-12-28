import { Spinner } from "../components/Spinner";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { BlogSkeleton } from "../components/BlogSkeleton";
export const Blog=()=>{
    const {id}=useParams()
    const {loading,blog}=useBlog({
        id:id || ""
    })
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
        <FullBlog blog={blog}/>
    </div>
}