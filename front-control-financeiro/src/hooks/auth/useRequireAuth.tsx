
import { useUsersContext } from "./useAuthContext";
import Login from "../../components/Login";


export const RequireAuth = ({children}: { children: JSX.Element }) =>{
    const auth = useUsersContext();
    if(!auth.user){
        return <Login />;
    }
    return children;
}