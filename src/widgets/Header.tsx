import { TaskCategory, type TaskCategoryType } from "@/shared/types/enums"
import { Link } from "react-router-dom"
import { setSearchTerm, setTagFilter } from "@/features/filters/filtersSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { SearchInput } from "./SearchInput"

const Header = () => {

    const dispatch = useAppDispatch()
    const { searchTerm, tagFilter } = useAppSelector((state) => (state.filters))
    
    return (
        <header className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex gap-3">
                <SearchInput
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                    className="border rounded-lg p-2 outline-none flex-1 bg-white w-[400px] pl-10"
                    placeholder="Поиск по названию..."
                />

                <select
                    value={tagFilter}
                    onChange={(e) => dispatch(setTagFilter(e.target.value as TaskCategoryType | "all"))}
                    className="border rounded-lg p-2 outline-none bg-white"
                >
                    <option value="all">Все теги</option>
                    {Object.values(TaskCategory).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            
            <Link to="/task/new" className="w-full md:w-auto">
                <button className="border-2 rounded-lg p-2 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 w-full">
                    Добавить задачу
                </button>
            </Link>
        </header>
    )
}

export default Header
