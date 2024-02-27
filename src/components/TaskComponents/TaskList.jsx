import axios from "axios";
import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import DataContext from "../../context/DataContext";


export default function TaskList(){

    const {works, setWorks, error, setError} = useContext(DataContext);

    const handleFavourite = async (userID) =>{
        try{
            const result = await axios.patch(`http://localhost:8000/todo/${userID}`,{
               "fav" : true
            })
            setWorks(result.data);
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
                                        <button className="text-sky-500">Edit</button>
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