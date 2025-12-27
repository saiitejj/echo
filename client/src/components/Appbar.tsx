import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar=()=>{
    return (
        <div className="relative border-b flex justify-between px-10 py-4">
            <Link to={`/`} >
                <img src="/echo_svg.svg" 
                    alt="Echo Logo"
                    className="w-12 h-10 cursor-pointer" />
            </Link>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl">
                    Echo
            </div>
            <div className="flex items-center">
                <Link to={`/publish`}>
                    <button type="button" className="mr-8 bg-[#37353E] text-white cursor-pointer transition-colors hover:bg-[#37353E]/50 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 text-center">
                        New
                    </button>
                </Link>
                <Link to={'/profile'}>
                    <Avatar size={"big"} name="Sai" />
                </Link>
            </div>

        </div>
    )
}