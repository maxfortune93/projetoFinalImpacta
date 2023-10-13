
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useApi } from "../../services/useApi";

interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
}

interface UserProviderProps {
    children: ReactNode;
}

type UserInput = Omit<User, 'id'>;

interface UserContextData {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => Promise<void>;
    signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<boolean>;
}

const UsersContext = createContext<UserContextData>({} as UserContextData)

export function UsersProvider({children}: UserProviderProps){
    const [user, setUser] = useState<User | null>(null);

    const apiService = useApi();

    // const authenticateUser = async (token: string) => {
    //     try {
    //         const user = await apiService.getUserData(token); // Substitua por uma chamada à API para obter dados do usuário usando o token
    //         setUser(user);
    //         setLoading(false);
    //     } catch (error) {
    //         // Lida com erros ao autenticar usuário com token
    //         console.error("Erro ao autenticar usuário:", error);
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     if (token) {
    //         // Autentica automaticamente o usuário se um token estiver presente no localStorage
    //         authenticateUser(token);
    //     } else {
    //         setLoading(false); // Se não houver token, a verificação está concluída
    //     }
    // }, []); // O segundo argumento vazio garante que este efeito seja executado apenas uma vez durante o carregamento inicial


    const signin = async (email: string, password: string) => {
        const data = await apiService.login(email, password);
        if(data.name && data.accessToken){
            setUser(data.name);
            setToken(data.accessToken);
            return true;
        } 
        return false;
    }

    const signup = async (name: string, email: string, password: string, confirmPassword: string) => {
        const data = await apiService.register(name, email, password, confirmPassword)
        if(data.name && data.accessToken){
            setUser(data.name);
            setToken(data.accessToken);
            return true;
        } 
        return false;
    }

    const signout = async()=> {
        // await apiService.logout();
        setUser(null);
        setToken('');
    }

    const setToken = (token: string)=> {
        localStorage.setItem('authToken', token);
    }
    
    // useEffect(()=> {
    //     const validateToken = async ()=>{
    //         const storageData = localStorage.getItem('authToken');
    //         if(storageData){
    //             const data = await apiService.validateToken(storageData);
    //             if(data.user){
    //                 setUser(data.user);
    //             }
    //         }

    //     }
    //     validateToken();
    // }, [apiService]);

    return (
        <UsersContext.Provider value={{ user, signin, signup, signout}}>
            {children}
        </UsersContext.Provider>
    )
}

export function useUsersContext(){
    const context = useContext(UsersContext);
    return context;
}