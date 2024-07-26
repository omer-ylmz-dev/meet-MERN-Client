import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setUser } from '../../features/auth/authSlice'
import {decryptData} from "../../utils/useCrypto"



const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: 'include',
	prepareHeaders: (headers, {getState}) => {
		
		const token = localStorage.getItem("sessionID")
		
		if(token){
			let BearerToken = JSON.parse(decryptData(token))
			headers.set("authorization",`Bearer ${BearerToken}`)
		}
		
		return headers
		
		
	}
})


const baseQueryWithReauth = async(args,api,extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)
	
	console.log("baseQueryWithReauth - result: ",result)

	
    if (result?.error) {
		const refreshResult = await baseQuery('/auth/verify-refresh-token', api, extraOptions)
				
		if(refreshResult?.data){
			console.log("refreshResult?.data: ",refreshResult?.data)
			api.dispatch(setUser(refreshResult?.data))
			result = await baseQuery(args, api, extraOptions)
		}
		else{
			api.dispatch(logout())
		}
    }

    return result
}


export const meetAPI = createApi({
    baseQuery: baseQueryWithReauth,
	tagTypes:["Post","Setting","Profile"],
    endpoints: builder => ({})
})