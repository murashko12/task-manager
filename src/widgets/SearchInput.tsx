import { IoIosSearch } from "react-icons/io";
import type { InputHTMLAttributes } from "react";

export const SearchInput = ({...attr}: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <div className="relative flex-1 w-[400px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoIosSearch className="text-gray-400" size={20} />
            </div>
            <input
                {...attr}
            />
        </div>
    )
}