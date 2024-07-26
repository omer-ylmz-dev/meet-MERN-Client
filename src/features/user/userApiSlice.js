import {meetAPI} from "../../app/services/meetAPI"


export const userApiSlice = meetAPI.injectEndpoints({
    endpoints: builder => ({
		follow: builder.mutation({
			query: (data) => ({
				url:`/user/follow`,
				method:"PUT",
				body:data
			}),
			invalidatesTags:["Profile","Post"]
		}),
		getUserProfile: builder.query({
			query: (username) => ({
				url:`/user/get-user-profile/${username}`,
			}),
			providesTags:["Profile","Post"]
		}),
		searchUser: builder.mutation({
			query: (searchTag) => ({
				url: `/user/search-user/${searchTag}`,
				method:"POST"
			}),
			invalidatesTags:["Profile"]
		})
	})
})


export const {
    useFollowMutation,
    useGetUserProfileQuery,
	useSearchUserMutation
} = userApiSlice 