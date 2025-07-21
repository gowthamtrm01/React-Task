export function dateFormat(dueDate){
    const date = new Date(dueDate).getDate();
    const month = new Date(dueDate).getMonth();
    const year = new Date(dueDate).getFullYear();
    const hour = new Date(dueDate).getHours();
    const minute = new Date(dueDate).getMinutes();
    const amPm = hour > 12 ? "PM" : "AM";
    return `${date}/${month}/${year} ${hour}:${minute} ${amPm}`
}

export function changeDateFormat(date){
    const formatDate= date.split('T')[0]
    return formatDate
}

export function mapEditTask(task){
    const taskAttr = task
    console.log({...taskAttr, dueDate: changeDateFormat(task.dueDate)})
    return {...taskAttr, dueDate: changeDateFormat(task.dueDate)}
}