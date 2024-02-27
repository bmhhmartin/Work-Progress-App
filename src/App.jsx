import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskBoard from "./components/TaskComponents/TaskBoard";
import DataContext from "./context/DataContext";

const App =()=>{

  const [works, setWorks] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    const getData = async () => {
      try{
        const response = await axios.get(`http://localhost:8000/todo`);
        setWorks(response.data);
      }catch(err){
        if(err.response){
          setError(`Server Error Status: ${err.response.status}, Message: ${err.response.message}`)
        }
      }
    }
    getData();
    console.log(works);
  }, []);



  return (
    <>
      <DataContext.Provider value={{works, setWorks, error, setError}}>
        <Header></Header>
        <TaskBoard></TaskBoard>
        <Footer></Footer>
      </DataContext.Provider>
    </>
  )
}
export default App;