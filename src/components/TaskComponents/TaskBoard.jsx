import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import AddTaskModal from "./AddTaskModal";
import EditModal from "./EditModal";
import TaskList from "./TaskList";
import TaskSearch from "./TaskSearch";
import TopPanel from "./TopPanel";

const TaskBoard =()=>{
    const [addShowModal, setAddShowModal] = useState(false);
    const [editShowModal, setEditShowModal] = useState(false);
    const [editID, setEditID] = useState();
    const {works, setWorks} = useContext(DataContext);

    
    const handleEdit = (item) =>{
        setEditShowModal(true);
        setEditID(item)
    }

    const handleSearch = (searchData) =>{
        const mainData = works.filter((work)=>(
            work.title.toLowerCase().includes(searchData.toLowerCase())
        ))
        setWorks(mainData);
    }

    const mainFIlter = (filterData) =>{
        const finalFiltered = works.filter((work)=>(
            work.progress.includes(filterData)
        ))
        setWorks(finalFiltered);
        console.log(finalFiltered);
    }

    return (
        <section className="mb-20 mt-[150px]" id="tasks">
            {addShowModal && <AddTaskModal allTasks={tasks} closeModal={()=>{setAddShowModal(false)}}/>}
            {editShowModal && <EditModal passData = {editID} closeEditModal={()=>{setEditShowModal(false)}}></EditModal>}
            
            <div className="container mx-auto">
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TopPanel addClick={setAddShowModal}></TopPanel>
                    <TaskSearch onSearch ={handleSearch} onFilter={mainFIlter}></TaskSearch>
                    {
                        works.length > 0 ? <TaskList editClick ={handleEdit}></TaskList> : <h2 className="text-center text-red-500 text-[30px] font-bold">No Task Found !!!</h2>
                    }
                </div>
            </div>
        </section>
        
    )
}
export default TaskBoard;