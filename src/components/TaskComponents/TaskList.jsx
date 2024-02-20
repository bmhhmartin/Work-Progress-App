import { FaStar } from "react-icons/fa";


export default function TaskList({allTasks, Error, onFav}){
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
                        allTasks.map((item)=>(
                            <tr key={item.id} className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-4">
                                <td><button onClick={onFav}>{item.favourite ? <FaStar className="text-sky-500" /> :<FaStar color="gray" />}</button></td>
                                <td>{item.favourite ? <div className="text-sky-300">{item.title}</div> : <div className="text-white">{item.title}</div> }</td>
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
                                <td className="text-center">{item.progress == "Done" ? <div className="text-green-500">{item.progress}</div>  : <div className="text-purple-500">{item.progress}</div> }</td>
                                <td>
                                    <div className="flex items-center justify-center space-x-3">
                                        <button className="text-red-500">Delete</button>
                                        <button className="text-sky-500">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {Error && <h2 className="text-center text-red-400 font-bold text-lg">{Error}</h2>}
        </div>
    )
}