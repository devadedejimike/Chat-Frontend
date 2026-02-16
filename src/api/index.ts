import axios from "axios";

export const API = axios.create({baseURL:"http://localhost:5000/api"})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if(token && req.headers){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})
export const SignIn = (data:any) => API.post('/auth/login', data);
export const SignUp = (data: any) => API.post('/auth/signup', data);
