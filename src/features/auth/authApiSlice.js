import {meetAPI} from "../../app/services/meetAPI"
import {logout} from "./authSlice"

export const authApiSlice = meetAPI.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: (data) => ({
				url:"/auth/login",
				method:"POST",
				body:data
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url:"/auth/register",
				method:"POST",
				body:data
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url:"/auth/logout",
				method:"POST",
			}),
			transformResponse: (data) => data.message,
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					console.log(data)
					dispatch(logout())
					setTimeout(() => {
						dispatch(meetAPI.util.resetApiState())
					}, 1000)
				} catch (err) {
					console.log(err)
				}
			}
		}),
		verifyRefreshToken: builder.query({
			query: () => ({
				url:"/auth/verify-refresh-token",
				headers: {"Content-Type": "application/json"}
			}),
			providesTags:["Setting","Profile"]
		})
	})
})


export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useVerifyRefreshTokenQuery
} = authApiSlice 