import { useEffect, useState } from "react";
import { initTask } from "../utility/initialValue";
import { useNavigate, useParams } from "react-router";
import { createTask, getTaskById, updateTask } from "../api";
import { ACTIONS } from "../utility/initialValue";
import { useTask } from "../components/TaskContext";
import { mapEditTask } from "../utility/helper";

export default function AddAndEditPage(){

    const{state, dispatch} = useTask()
    const navigate = useNavigate()
    const [task, setTask] = useState(initTask)
    const {id} = useParams();

    const onCancel = () => {
        setTask(initTask);
        navigate('/home');
    }

    const handleOnChange = (identifier, event) => {
        setTask((prevState) => ({
        ...prevState,
        [identifier]: event.target.value,
        }));
    }

    const getTaskId = async(id) => {
        try{
            const {data} = await getTaskById(id);
            setTask(mapEditTask(data))
        }catch(err){
            console.log('get task by id: ', err.message)
        }
    }

    useEffect(() => {
        if(id){
            getTaskId(id)
        }
    },[id])

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            if(id){
                const {__v, ...reData} = task
                const {data} = await updateTask(id, reData)
                dispatch({type: ACTIONS.UPDATE_TASK, id, payload: data})
            }else{
                const {data} = await createTask(task)
                dispatch({type: ACTIONS.ADD_TASK, payload: data})
            }
            navigate('/home');
        }catch(err){
            console.log("Add/Update Task", err.message)
        }
    }

    return <>
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handleOnSubmit}>
                <div className="text-center">
                    <h1 className="font-nunito text-3xl ">{id ? 'Edit' : 'Add'} Task</h1>
                </div>
                <div className="mt-10 w-80">
                    <input type="taskName" required value={task?.taskName} onChange={(e) => handleOnChange("taskName", e)} name="taskName" placeholder="Enter Task Name" className="py-4 block w-full bg-gray-200  px-3 py-1.5 text-base rounded" ></input>
                </div>
                <div className='mt-5 w-80'>
                    <input  type="description" required value={task?.description} onChange={(e) => handleOnChange("description", e)} name="description" placeholder="Description" className="py-4 block w-full bg-gray-200 px-3 py-1.5 text-base rounded"></input>
                </div>
                <div className='mt-5 w-80'>
                    <input  type="date" required value={task?.dueDate} name="dueDate" onChange={(e) => handleOnChange("dueDate", e)} placeholder="Date Picker"  className="py-4 block w-full bg-gray-200 px-3 py-1.5 text-base text-gray-500 rounded"></input>
                </div>
                <div className="mt-6 w-80 text-center ">
                    <button type="submit" className="py-3 px-5 rounded-full bg-blue-800 text-white" >{id ? 'Update' : 'Save'}</button>
                    <div>
                        <button type="button" onClick={onCancel}  className="mt-2 py-3 px-5 rounded-full" >Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </>
}