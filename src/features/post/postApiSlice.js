import {meetAPI} from "../../app/services/meetAPI"


export const postApiSlice = meetAPI.injectEndpoints({
    endpoints: builder => ({
		createPost: builder.mutation({
			query: (post) => ({
				url:"/post/create",
				method:"POST",
				body:post
			}),
			invalidatesTags:["Post"]
		}),
		deletePost: builder.mutation({
			query: (postID) => ({
				url:`/post/delete/${postID}`,
				method:"DELETE",
			}),
			invalidatesTags:["Post"]
		}),
		likePost: builder.mutation({
			query: (data) => ({
				url:`/post/like`,
				method:"PUT",
				body:data
			}),
			invalidatesTags:["Post"]
		}),
		writeComment: builder.mutation({
			query: (data) => ({
				url:`/post/write-comment`,
				method:"PUT",
				body:data
			}),
			invalidatesTags:["Post"]
		}),
		getTimeline: builder.query({
			query: (currentUser) => ({
				url:`/post/get-timeline/${currentUser}`,
			}),
			transformResponse: (data) => {
				return data.reverse()
			},
			providesTags:["Post"]
		}),
		getPost: builder.query({
			query: (postID) => ({
				url:`/post/get-post/${postID}`,
			}),
			providesTags:["Post","Profile"]
		}),
	})
})


export const {
    useCreatePostMutation,
    useDeletePostMutation,
    useLikePostMutation,
    useWriteCommentMutation,
    useGetTimelineQuery,
    useGetPostQuery,
} = postApiSlice 