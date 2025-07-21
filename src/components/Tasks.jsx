import { useNavigate } from "react-router";
import { deleteTask } from "../api";
import { ACTIONS } from "../utility/initialValue";
import { useTask } from "./TaskContext";
import ActionIcon from "./ActionIcon";

export default function Tasks() {
  const {state, dispatch} = useTask()
  const navigate = useNavigate()

  const onEdit = (id) => {
    navigate(`/editTask/${id}`)
  }

  const onDelete = async (id) => {
    try{
      const {status} = await deleteTask(id)
      if(status === 200){
        dispatch({type: ACTIONS.DELETE_TASK,id})
      }
    }catch(err){
      console.log("delete", err.message)
    }
  }

  return state.map((item, index) => {
    return (
      <div className="mt-1 px-3 py-5 shadow-md sm:flex md:grid grid-cols-5 gap-2" key={item._id}>
        <p className="content-center sm:block hidden">{index + 1}</p>
        <p className="content-center">{item.dueDate}</p>
        <p className="content-center">{item.taskName}</p>
        <p className="content-center">{item.description}</p>
        <button className="group relative w-5">
          <ActionIcon/>
          <div className="w-18 absolute bg-white left-full right-0 rounded-lg p-3 mt-1 shadow-md scale-y-0 group-focus:scale-y-100 origin-top duration-200">
            <p onClick={() => onEdit(item._id)} className="hover:bg-gray-300 rounded px-1">Edit</p>
            <p onClick={() => onDelete(item._id)} className="hover:bg-gray-300 rounded w-12">Delete</p>
          </div>
        </button>
      </div>
    );
  });
}
