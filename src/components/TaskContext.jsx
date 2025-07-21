import React, { useReducer, useContext } from "react";
import { ACTIONS } from "../utility/initialValue";

const TaskContext = React.createContext()

export const useTask = () => {
    return useContext(TaskContext)
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.INITIAL_TASK:
            return action.payload
        case ACTIONS.ADD_TASK:
            return [...state, action.payload]
        case ACTIONS.UPDATE_TASK:
            return state.map((item) => item._id === action.id ? action.payload : item)
        case ACTIONS.DELETE_TASK:
            return state.filter((item) => item._id !== action.id)
        default:
            return state
    }
}


export function TaskProvider({children}){

    const [state, dispatch] =  useReducer(reducer, []);

    return (
        <TaskContext.Provider value={{state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )

}