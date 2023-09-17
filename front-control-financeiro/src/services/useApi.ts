import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.base_url_backend,
});

export const useApi = ()=>({
    validateToken: async (token: string)=>{
        return {
            user: 'Marouane'
        };
        const response = await api.post('/validate', {token});
        return response.data;
    },

    register: async (name: string, email: string, password: string, confirmPassword: string)=>{
        const payload = {
            name: name,
            email: email, 
            password: password,
            confirmPassword: confirmPassword
        }
        const response = await api.post('http://localhost:8090/auth-token/register', payload);
        return response.data;
    },

    login: async (email: string, password: string)=>{
        const response = await api.post('http://localhost:8090/auth-token/login', { email: email, password: password});
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/login');
        return response.data;
    }
})