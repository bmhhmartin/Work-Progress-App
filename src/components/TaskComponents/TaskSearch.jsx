import { useState } from "react";

const TaskSearch =({onSearch, onFilter})=>{

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    const handleClick = (e) =>{
        e.preventDefault();
        onSearch(search);
    }

    const filterChange = (e) =>{
        e.preventDefault();
        setFilter(e.target.value);
        onFilter(e.target.value);
    }

    return (
        <div>
            <form>
                <div className="flex items-center justify-between py-5">
                    <div className="grid-cols gap-x-6 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        <div className="space-y-2 lg:space-y-3">
                            <select onChange={filterChange} className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5" name="progress" id="progress" required>
                                <option>Filter By Progress</option>
                                <option value="Done">Done</option>
                                <option value="Progress">In Progress</option>
                                <option value="Backlog">Backlog</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                        <input type="search" id="search-dropdown"
                            className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none" placeholder="Search Task" value={search} onChange={(e)=>setSearch(e.target.value)} 
                            required />
                        <button onClick={handleClick} type="submit" className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4">
                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default TaskSearch;