import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs=()=>{
    const {loading,blogs}=useBlogs();
    if(loading){
        return <div>
            <Appbar />
            <div className="flex justify-center flex-col items-center h-screen">
                 <div>Loading...</div>
            </div>
        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>

                {blogs.map(blog => 
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={new Date(blog.createdAt).toDateString()} 
                    />
                )}
            </div>

        </div>
    </div>
}

export default Blogs