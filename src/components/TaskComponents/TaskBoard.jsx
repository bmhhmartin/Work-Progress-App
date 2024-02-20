import axios from "axios";
import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskList from "./TaskList";
import TaskSearch from "./TaskSearch";
import TopPanel from "./TopPanel";

const TaskBoard =()=>{
    const [addShowModal, setAddShowModal] = useState(false);
    const [fav, setFav] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const handleFavourite = () => {
        setFav(!fav);
    }
    

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const response = await axios.get(`http://localhost:8000/todo`);
                if (response && response.data) {
                    setTasks(response.data);
                }
            }catch(err){
                if(err.response){
                    setError(`Server Error Status: ${err.response.status}, Message: ${err.response.message}`)
                }
            }
        }
        fetchData();
    }, [tasks]);


    return (
        <section className="mb-20 mt-[150px]" id="tasks">
            {addShowModal && <AddTaskModal allTasks={tasks} closeModal={()=>{setAddShowModal(false)}}/>}
            <div className="container mx-auto">
                <TaskSearch></TaskSearch>
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TopPanel addClick = {()=>{setAddShowModal(true)}}></TopPanel>
                    <TaskList onFav={handleFavourite} allTasks={tasks} Error={error}></TaskList>
                </div>
            </div>
        </section>
        
    )
}
export default TaskBoard;