import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import EditModal from "./EditModal";
import TaskList from "./TaskList";

const TaskBoard =()=>{
    const [addShowModal, setAddShowModal] = useState(false);
    const [editShowModal, setEditShowModal] = useState(false);
    const [editID, setEditID] = useState();

    
    const handleEdit = (item) =>{
        setEditShowModal(true);
        setEditID(item)
    }

    return (
        <section className="mb-20 mt-[150px]" id="tasks">
            {addShowModal && <AddTaskModal allTasks={tasks} closeModal={()=>{setAddShowModal(false)}}/>}
            {editShowModal && <EditModal passData = {editID} closeEditModal={()=>{setEditShowModal(false)}}></EditModal>}
            <div className="container mx-auto">
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskList editClick = {handleEdit}></TaskList>
                </div>
            </div>
        </section>
        
    )
}
export default TaskBoard;