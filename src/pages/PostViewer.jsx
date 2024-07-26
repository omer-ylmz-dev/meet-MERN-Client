import { FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import { IoPersonAdd, IoPersonRemoveSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";


import Comment from "../components/post/Comment"
import LoadingScreen from "../components/loading/LoadingScreen"
import Loading from "../components/loading/Loading"
import NotFound from "./NotFound"

import {useParams,useNavigate,Navigate} from "react-router-dom"

import {useGetPostQuery,useWriteCommentMutation,useLikePostMutation,useDeletePostMutation} from "../features/post/postApiSlice"
import {useFollowMutation} from "../features/user/userApiSlice"

import {useSelector} from "react-redux"
import {useState} from "react"


import {format} from "timeago.js"


import { ToastContainer } from 'react-toastify';



import {toastSuccess,toastError} from "../utils/useToast"


export default function PostViewer() {
	
	const {postID} = useParams()
	const navigation = useNavigate()
	
	const {data:post, isLoading, isSuccess, isError, error} = useGetPostQuery(postID)
	

	const {user,profilePicture} = useSelector(state => state.auth)
	
	const [comment,setComment] = useState({username:user, comment:"", profilePicture:profilePicture})

	
	const [follow, {data:followStatus, isLoading:followLoading, error:followErrorStatus}] = useFollowMutation()
	
	const [writeComment, {data:writeStatus, isLoading:writeLoading, error:writeErrorStatus}] = useWriteCommentMutation()
	
	const [likePost, {data:likeStatus, isLoading:likeLoading, error:likeErrorStatus}] = useLikePostMutation()
	
	const [deletePost, {data:deleteStatus, isLoading:deleteLoading, error:deleteErrorStatus}] = useDeletePostMutation()
	
	
	document.title = !isLoading ? `${post?.description} | meet` : "meet"
	
	 const onChange = (e) => setComment(prev => ({...prev, [e.target.name] : e.target.value}))
	
	
	const handleFollow = async() => {
	
		try{
			const request = await follow({username:post?.username,currentUser:user}).unwrap()
			if(request.message){
				toastSuccess(request.message)
			}
		}catch(err){
			toastError(err?.data?.message)
		}
	}
	
	
	
	
	
	
	const handleLike = async() => {	
		
		if(user){
			try{			
				const request = await likePost({postID:post._id, user}).unwrap()
			}catch(err){
				toastError(err?.data?.message)
			}
		}
	}
	
	

	
	const handleWrite = async() => {
		if(user){
			try{
				const createdTime = new Date().toISOString()
				
				const request = await writeComment({...comment,postID:post?._id,createdTime}).unwrap()
				setComment({username:user, comment:"", profilePicture:profilePicture})
			}catch(err){
				toastError(err?.data?.message)
			}
		}
		
	}
	
	
	
	
	const handleDelete = async() => {
		try{			
			let choice = confirm("Are you sure you want to delete?")
			if(choice === true){
				const request = await deletePost(post?._id).unwrap()
				navigation("/")
			}
		}catch(err){
			toastError(err?.data?.message)
			
		}
	}
	
	
	
	
	if(isLoading){
		return <LoadingScreen condition={isLoading}/>
	}
	
	
	if(isError && !isSuccess && !post){
		return <NotFound/>
	}
	
	
	
	if(!isLoading && isSuccess){
		return(
			<section className="postViewer poppins-regular">
				<article className="postViewerContainer">
					<article className="postViewerLeftSide">
						<div className="postViewerPhoto">
							<img src={`${import.meta.env.VITE_SERVER_URL}/images/${post?.contentName}`} />
						</div>
					</article>
					<article className="postViewerRightSide">
						<header className="postViewerHeader">
							<div className="postUser">
								<img src={`${import.meta.env.VITE_SERVER_URL}/images/${post?.userDetails.profilePicture}`} />
								<div className="postUserDetails">
									<span onClick={() => navigation(`/profile/${post?.username}`)}>{post?.username}</span>
									<span className="postLocation">{post?.location}</span>
								</div>
								{
									post?.userDetails?.followers?.includes(user) ? 
									<IoPersonRemoveSharp className="followButton" size={25} onClick={handleFollow} /> :
									user !== post?.username && user !== null ? <IoPersonAdd className="followButton" size={25} onClick={handleFollow}/> : null
									 
								}
							</div>
							<div className="postOptions">
								{post?.username === user ? <MdDelete size={30} onClick={handleDelete} /> : null}
							</div>
						</header>
						<article className="postViewerComments">
						{
							!isLoading && post?.comments.map((comment,i) =>
								<Comment comment={comment} key={i} />
							)
						}
						</article>
						<footer className="postViewerFooter">
							<article className="postButtons">
								<div className="postButtonsLeftSide">
									<FcLikePlaceholder size={25} onClick={handleLike}/>
									<FaRegComment size={25} />
								</div>
								<div className="postButtonsRightSide">
									<div>{post?.likes.length} Likes</div>
									<div>{post?.comments.length} Comments</div>
								</div>
							</article>
							{user ? 
								<article className="postCommentInput">
									<input type="text" value={comment?.comment} className="commentInputStyle" placeholder="Type your comment" name="comment" onChange={onChange}/>
									<RiSendPlaneLine size={30} onClick={handleWrite} />
								</article>
								: <span className="commentWarn">Please Login to Comment</span>
							}
							<footer className="postDetails">
								{format(post?.createdTime)}
							</footer>
						</footer>
					</article>
				</article>
				<ToastContainer />
			</section>
		)
	}
	
	
}

