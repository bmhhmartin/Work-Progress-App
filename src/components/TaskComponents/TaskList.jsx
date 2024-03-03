import axios from "axios";
import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import DataContext from "../../context/DataContext";


export default function TaskList({editClick}){

    const {works, setWorks, error, setError} = useContext(DataContext);
    const [search, setSearch] = useState();

    const searchHandle = (e) =>{
        setSearch(e.target.value);
    }


    const handleFavourite = async (userID) =>{
        try{
            const result = await axios.patch(`http://localhost:8000/todo/${userID}`,{
               "fav" : true
            })
            const updateFav = works.map((work)=>(
                work.id === result.data.id ? result.data : work
            ))
            setWorks(updateFav);
        }catch(err){
            setError(err.message)
        }
    }

    const handleDelete = async (deleteID) =>{
        try{
            await axios.delete(`http://localhost:8000/todo/${deleteID}`);
            const filterData = works.filter((work)=> work.id !== deleteID );
            setWorks(filterData);
        }catch(err){
            setError(err.message)
        }
    }

    return (
        <div className="overflow-auto">
            <form>
                <div className="flex items-center justify-between py-5">
                    <div className="grid-cols gap-x-6 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        <div className="space-y-2 lg:space-y-3">
                            <select className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5" name="progress" id="progress" required>
                                <option value="">Select Progress</option>
                                <option value="Done">Done</option>
                                <option value="Progress">In Progress</option>
                                <option value="Backlog">Backlog</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                        <input type="search" id="search-dropdown" onChange={searchHandle}
                            className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none" placeholder="Search Task"
                            required />
                        <button type="submit" className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4">
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
            <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                    <tr>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px] text-left"> Title </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-full text-left"> Description </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[250px]"> Tags </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[200px]"> Progress </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Options </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        works.map(item=>(
                            <tr key={item.id} className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-4">
                                <td><button onClick={()=>{handleFavourite(item.id)}}>{item.fav ? <FaStar className="text-yellow-500"/> : <FaStar color="gray" /> } </button></td>
                                <td>{item.fav ? <div className="text-yellow-500">{item.title}</div> : <div className="text-white">{item.title}</div>}</td>
                                <td>
                                    {item.description}
                                </td>
                                <td>
                                    <ul className="flex justify-center gap-1.5 flex-wrap">
                                        {
                                            item.tags.map((tag, index)=>(
                                                <li key={index}>
                                                    <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-orange-700 px-2.5 text-sm capitalize text-[#F4F5F6]">{tag}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </td>
                                <td className="text-center">{item.progress == 'Done' ? <div className="text-green-500">{item.progress}</div> : <div className="text-purple-500">{item.progress}</div>}</td>
                                <td>
                                    <div className="flex items-center justify-center space-x-3">
                                        <button onClick={()=>{handleDelete(item.id)}} className="text-red-500">Delete</button>
                                        <button onClick={()=>{editClick(item)}} className="text-sky-500">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {error && <h2 className="text-center text-red-500 text-[30px] font-bold">{error}</h2>}
        </div>
    )
}