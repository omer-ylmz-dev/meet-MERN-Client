import {Navigate,Outlet,useNavigate} from "react-router-dom"
import useAuth from "../../features/auth/useAuth"


export default function Public(){
	
	const {isLoading,isSuccess} = useAuth()
	
		
	if(!isLoading || isSuccess){
		return <Outlet />
	}
	
}