import axios from "axios";
import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";


const AddTaskModal =({closeModal})=>{

    const {works, setWorks, setError} = useContext(DataContext);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [progress, setProgress] = useState('');
    
    const handleSubmit = async () =>{
        closeModal(false);
        try{
            const id = works.length ? Number(works[works.length - 1].id) +1 : 1;
        
            const result = await axios.post(`http://localhost:8000/todo`,{
                "id": id.toString(),
                "fav": false,
                "title": title,
                "description": description,
                "progress": progress,
                "tags": [tags]
            })

            setWorks([...works, result.data]);

        }catch(err){
            setError(err)
        }
    }





    return (
        <>
            <div className="bg-black opacity-90 fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10"></div>
            <form className="absolute z-[100] top-[50px] left-0 right-0 mx-auto w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:p-11">
                <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
                    Add New Task
                </h2>
                <div className="space-y-9 text-white lg:space-y-10">
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="title">Title</label>
                        <input className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="description">Description</label>
                        <textarea className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]" type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                    <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="tags">Tags</label>
                            <input className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5" type="text" name="tags" id="tags" value={tags} onChange={(e)=>{setTags(e.target.value)}}/>
                        </div>
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="progress">Select Progress</label>
                            <select className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5" name="progress" id="progress" value={progress} onChange={(e)=>{setProgress(e.target.value)}}>
                                <option value="">Select Progress</option>
                                <option value="Done">Done</option>
                                <option value="Progress">In Progress</option>
                                <option value="Backlog">Backlog</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-16 flex justify-between lg:mt-20">
                    <button onClick={closeModal} className="rounded bg-red-800 px-4 py-2 text-white transition-all hover:opacity-80">Close</button>
                    <button type="submit" onClick={handleSubmit} className="rounded bg-orange-600 px-4 py-2 text-white transition-all hover:opacity-80">Create new Task</button>
                </div>
            </form>
        </>
    )
}
export default AddTaskModal;