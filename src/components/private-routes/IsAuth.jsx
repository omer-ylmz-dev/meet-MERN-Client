import {Navigate,Outlet,useNavigate} from "react-router-dom"
import useAuth from "../../features/auth/useAuth"

export default function IsAuth(){
	
	const navigation = useNavigate()
	const {isUninitialized,user,isLoading,isSuccess,sessionID,isError} = useAuth()
		
	
	if(!sessionID || isError){
		return <Outlet />
	}else if(!isLoading && isSuccess || user && isUninitialized){
		navigation(-1)
	}
	
}