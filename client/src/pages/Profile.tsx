import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks";

export const Profile=()=>{
    const navigate=useNavigate()
    const name = localStorage.getItem("authorName") || "Anonymous";
    const email = localStorage.getItem("authorEmail") || "No Email";
    const userId=localStorage.getItem("userId")

    const {loading,blogs}=useBlogs()

    const myBlogs=blogs?blogs.filter(b=>String(b.authorId)===userId):[]
    const logout=()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }
    if (loading) {
        return <div><Appbar /><div>Loading...</div></div>;
    }
    return <div>
        <Appbar />
        <div className="flex justify-center pt-12">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center pb-10">
                    <div className="scale-150 mb-4">
                        <Avatar size="big" name={name}/>
                    </div>
                    <h5 className="mb-1 text-xl font-medium text-gray-900">
                        {name}
                    </h5>
                    <span className="text-sm text-gray-500">
                        {email}
                    </span>
                </div>
                <div className="flex justify-center border-t border-gray-200 pt-6 pb-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-500">

                            {myBlogs.length}
                        </div>
                        <div className="text-sm text-gray-500">
                            Total Echos
                        </div>
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    <button
                        onClick={logout}
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-8 py-2.5 text-center"
                        >
                            Logout
                    </button>

                </div>
            </div>

        </div>

    </div>
}