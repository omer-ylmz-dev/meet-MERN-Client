import {meetAPI} from "../../app/services/meetAPI"


export const settingsApiSlice = meetAPI.injectEndpoints({
    endpoints: builder => ({
		getCurrentUserDetails: builder.query({
			query: (currentUser) => ({
				url:`/settings/get-current-user-details/${currentUser}`,
			}),
			providesTags:["Setting"]
		}),
		changeProfilePhoto: builder.mutation({
			query: (data) => ({
				url:`/settings/change-profile-photo`,
				method:"PATCH",
				body:data
			}),
			invalidatesTags:["Setting","Post","Profile"]
		}),
		changeMailAddress: builder.mutation({
			query: (data) => ({
				url:`/settings/change-mail-address`,
				method:"PATCH",
				body:data
			}),
			invalidatesTags:["Setting"]
		}),
		changePassword: builder.mutation({
			query: (data) => ({
				url:`/settings/change-password`,
				method:"PATCH",
				body:data
			}),
			invalidatesTags:["Setting"]
		}),
		deleteYourAccount: builder.mutation({
			query: (currentUser) => ({
				url:`/settings/delete-your-account/${currentUser}`,
				method:"DELETE",
			}),
			invalidatesTags:["Setting"]
		})
	})
})


export const {
    useGetCurrentUserDetailsQuery,
	useChangeProfilePhotoMutation,
	useChangeMailAddressMutation,
	useChangePasswordMutation,
	useDeleteYourAccountMutation,
} = settingsApiSlice 

