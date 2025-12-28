import { Appbar } from "./Appbar";
import { type Blog } from "../hooks";
import { Avatar } from "./BlogCard";
interface FullBlogProps {
    blog: Blog;
    onDelete: () => void; 
    onEdit: () => void;
}
export const FullBlog=({blog,onDelete,onEdit}:FullBlogProps)=>{
    const currentUserId=localStorage.getItem("userId")
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12 gap-8 ">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Posted on {new Date(blog.createdAt).toDateString()}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                    {currentUserId===String(blog.authorId )&&
                    
                        <div className="mt-12 flex gap-4 border-t pt-6">
                            <button 
                                onClick={onEdit}
                                className="text-gray-600 hover:text-black transition-colors font-medium cursor-pointer"
                            >
                                Edit Echo
                            </button>
                            <button 
                                onClick={onDelete}
                                className="text-red-600 hover:text-red-800 transition-colors font-medium cursor-pointer"
                            >
                                Delete
                            </button>

                        </div>
                    }
                </div>

                <div className="col-span-4 flex flex-col">
                        <div className="text-slate-600 text-lg font-medium mb-4">
                            Author
                        </div>

                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name || 'Anonymous'}

                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch phrase about the author's ability to grab the user's attention

                                </div>
                            </div>

                    </div>
                    
                </div>

            </div>

        </div>
    </div>
}