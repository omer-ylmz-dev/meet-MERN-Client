import {Navigate,Outlet,useNavigate} from "react-router-dom"
import useAuth from "../../features/auth/useAuth"



export default function RequireAuth(){

	const {isUninitialized,user,isLoading,isSuccess,sessionID,isError} = useAuth()

	
	if(!sessionID || isError){
		return <Navigate to="/login" />
	}else if(!isLoading && isSuccess){
		return <Outlet />
	}else if(user && isUninitialized){
		return <Outlet />
	} 
	
}