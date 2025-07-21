import { fetchTask } from "../api";
import ListHeader from "../components/ListHeader";
import Tasks from "../components/Tasks";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { dateFormat } from "../utility/helper";
import { ACTIONS } from "../utility/initialValue";
import { useTask } from "../components/TaskContext";


export default function HomePage(){

    const navigate = useNavigate()
    const {dispatch} = useTask()
    const onAddTask = () => {
        navigate('/addTask')
    }


    const getTask = async () => {
        try{
            const {data} = await fetchTask();
            const updatedTask = data.map(item => ({...item, dueDate: dateFormat(item.dueDate)}))
            dispatch({type: ACTIONS.INITIAL_TASK, payload:updatedTask})
        }catch(err){
            console.log("tasks: ", err.message)
        }
    }

    useEffect(() => {
        getTask()
    },[])

    return <div className="h-full mt-12 mx-6">
        <h1 className="text-blue-800 text-3xl">Tasks Management</h1>
        <div className="flex justify-end">
            <button onClick={onAddTask} className="mt-2 bg-blue-800 text-white rounded-full py-3 px-6">+ Add Task</button>
        </div>
        <div>
            <ListHeader />
            <Tasks/>
        </div>
    </div>
}