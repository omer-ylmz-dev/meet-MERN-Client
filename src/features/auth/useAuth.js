import {useVerifyRefreshTokenQuery} from "./authApiSlice"
import {useSelector} from "react-redux"
import {decryptData} from "../../utils/useCrypto"

export default function useAuth(){
	
	const sessionID = localStorage.getItem("sessionID") ? true : false
	
	
	const {user} = useSelector(state => state.auth)
	
	const {isLoading,isUninitialized,isSuccess,isError,error} = useVerifyRefreshTokenQuery(null,{
		skip:!user && sessionID ? false : true
	})
	

	return {isUninitialized,user,isLoading,isSuccess,sessionID,isError}
	
		
}