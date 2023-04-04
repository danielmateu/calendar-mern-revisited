import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const {
    VITE_API_URL,
} = getEnvVariables()

console.log({VITE_API_URL});

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
    // withCredentials: true
});

// Todo: Configurar interceptores
calendarApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // if (token) {
    //     config.headers['x-token'] = token;
    // }
    config.headers = {
        ...config.headers,
        'x-token': token
    }
    return config;
});

export default calendarApi;