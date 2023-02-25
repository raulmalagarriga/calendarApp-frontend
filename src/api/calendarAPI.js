import axios from "axios";
import getEnv from "../helpers/getEnv";

const {VITE_API_URL} = getEnv();

const calendarAPI = axios.create({
    baseURL: VITE_API_URL
});

// Configurar interceptores 

calendarAPI.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token' : localStorage.getItem('token') // para mantener el token del user activo
    }


    return config;
});

export default calendarAPI;