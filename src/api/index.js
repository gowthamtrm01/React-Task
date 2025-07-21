import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({baseURL: "http://localhost:5000/"});

API.interceptors.request.use((req) => {
    const token = Cookies.get('token')
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

export const signInUser = (payload) => API.post('/user/signIn', payload)
export const signUpUser = (payload) => API.post('/user/signUp', payload)

export const fetchTask = () => API.get(`/task`)
export const getTaskById = (id) => API.get(`/task/${id}`)
export const createTask = (payload) => API.post(`/task`, payload)
export const updateTask = (id, payload) => API.patch(`/task/${id}`, payload)
export const deleteTask = (id) => API.delete(`/task/${id}`)