import axios from 'axios';

// export const api = axios.create({
//     // baseURL: 'http://192.168.0.44:3000/api',
//     baseURL: 'http://localhost:8090/api',
// });

export const api = axios.create({
    baseURL: process.env.base_url_backend,
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('authToken');  
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})