import axios from "axios";
import { configs } from "eslint-plugin-react-refresh";

const api=axios.create({
    baseURL:"http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config)=>{
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

export default api;