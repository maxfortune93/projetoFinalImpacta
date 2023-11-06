
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

export const UsersContext = createContext<UserContextData>({} as UserContextData)

export function UsersProvider({children}: UserProviderProps){
    const [user, setUser] = useState<User | null>(null);

    const apiService = useApi();



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
        setUser(null);
        setToken('');
    }

    const setToken = (token: string)=> {
        localStorage.setItem('authToken', token);
    }

    const validateToken = async ()=>{
        const storageData = localStorage.getItem('authToken');
      
        if(storageData){
            const data = await apiService.validateToken(storageData);
            if(data.name || data.username){
                setUser(data.username);
                return true;
            }
        }
    }

    useEffect(()=> {       
        validateToken()
    },[]);
    

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