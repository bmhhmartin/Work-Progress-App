import axios from "axios";
import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";



const EditModal =({closeEditModal, passData})=>{
    const {works, setWorks} = useContext(DataContext);
    const [newFav, setNewFav] = useState(passData.fav);
    const [newTitle, setNewTitle] = useState(passData.title);
    const [newDescription, setNewDescription] = useState(passData.description);
    const [newTag, setNewTag] = useState(passData.tags);
    const [newProgress, setNewProgress] = useState(passData.progress);
    const editID = passData.id;



    const updateData = async (e) =>{
        e.preventDefault();
        closeEditModal(false);

        const result = await axios.patch(`http://localhost:8000/todo/${editID}`, {
            "title": newTitle,
            "fav": newFav,
            "description" : newDescription,
            "progress": newProgress,
            "tags": [newTag]
        });

        const updateAll = works.map((work)=>(
            work.id === result.data.id ? result.data : work
        ))

        setWorks(updateAll);
    }

    const updateFav = (e) =>{
        e.preventDefault();
        setNewFav(false);
    }

    return (
        <>
            <div className="bg-black opacity-90 fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10"></div>
            <form onSubmit={updateData} className="absolute z-[100] top-[50px] left-0 right-0 mx-auto w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:p-11">
                <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
                    Update Your Data
                </h2>
                <div className="space-y-9 text-white lg:space-y-10">
                    <div className="space-y-2 lg:space-y-3">
                        {newFav ? <label htmlFor="progress">Do you make it Unfavourite? </label> : <label htmlFor="progress">Do you make it Unfavourite? </label>}
                        {newFav ? <button className="bg-red-500 px-4 py-1" onClick={updateFav}>Yes</button> : <button className="bg-gray-200 text-gray-600 px-4 py-1" disabled>Selected</button>}
                        
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="title">Title</label>
                        <input className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"type="text" name="title" id="title" defaultValue={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="description">Description</label>
                        <textarea className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]" type="text" name="description" id="description" defaultValue={newDescription} onChange={(e) => setNewDescription(e.target.value)}></textarea>
                    </div>
                    <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="tags">Tags</label>
                            <input className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5" type="text" name="tags" id="tags" defaultValue={newTag} onChange={(e)=> setNewTag(e.target.value)}/>
                        </div>
                        <div className="space-y-2 lg:space-y-3">
                            <label htmlFor="progress">Select Progress</label>
                            <select className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5" name="progress" id="progress" defaultValue={newProgress} onChange={(e)=> setNewProgress(e.target.value)}>
                                <option value="">Select Progress</option>
                                <option value="Done">Done</option>
                                <option value="Progress">In Progress</option>
                                <option value="Backlog">Backlog</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-16 flex justify-between lg:mt-20">
                    <button onClick={closeEditModal} className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80">Cancel</button>
                    <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80">Update Data</button>
                </div>
            </form>
        </>
    )
}
export default EditModal;