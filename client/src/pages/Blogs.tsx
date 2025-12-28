import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Spinner } from "../components/Spinner";
import { BlogSkeleton } from "../components/BlogSkeleton";
const Blogs=()=>{
    const {loading,blogs}=useBlogs();

    if (loading){
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