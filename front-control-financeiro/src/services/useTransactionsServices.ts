import axios from 'axios';

// export const api = axios.create({
//     baseURL: process.env.base_url_backend,
// });

// const getToken = ()=> {
//     return localStorage.getItem('authToken');
// }

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


export const useTransactionServices = () => {

    return {

        create: async (title: string, amount: number, type: string, category: string, createdAt: string)=>{
            const payload = {
                title,
                amount, 
                type,
                category,
                createdAt,
                // userEmail
            }
            // const data= getToken()
            // console.log('no service', data);
            // return;
            const response = await api.post('http://localhost:8090/transactions', payload);
            return response.data;
        },
    
        updateTransactions: async (payload: any)=>{
            // const payload = {
            //     title,
            //     amount, 
            //     type,
            //     category,
            //     createdAt,
            // }
            const response = await api.patch(`http://localhost:8090/transactions/${payload.id}`, payload);
            return response.data;
        },
    
        getAllTransactions: async () => {
            const response = await api.get('http://localhost:8090/transactions');
            return response.data;
        },
    
        getOneTransactions: async (id: string) => {
            const response = await api.get(`http://localhost:8090/transactions/${id}`);
            return response.data;
        },
    
        deleteTransactions: async (id: string) => {
            const response = await api.delete(`http://localhost:8090/transactions/${id}`);
            return response.data;
        },
    }

 
}