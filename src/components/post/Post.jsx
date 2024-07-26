import { FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import { IoPersonAdd, IoPersonRemoveSharp } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

import {format} from "timeago.js"

import {useLikePostMutation,useDeletePostMutation,useWriteCommentMutation} from "../../features/post/postApiSlice"
import {useFollowMutation} from "../../features/user/userApiSlice"


import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {useState} from "react"

import {toastSuccess,toastError} from "../../utils/useToast"
import { ToastContainer } from 'react-toastify';

export default function Post({post}) {
	
	const navigation = useNavigate()
	
	const {user,profilePicture} = useSelector(state => state.auth)
	
	const [comment,setComment] = useState({username:user, comment:"", profilePicture:profilePicture})
	
	const onChange = (e) => setComment(prev => ({...prev, [e.target.name] : e.target.value}))
	
	
	const [follow, {data, isLoading, isSuccess, isError, error}] = useFollowMutation()
	const [likePost, {data:likeStatus, isLoading:likeLoading, error:likeErrorStatus}] = useLikePostMutation()
	const [deletePost, {data:deleteStatus, isLoading:deleteLoading, error:deleteErrorStatus}] = useDeletePostMutation()
	const [writeComment, {data:writeStatus, isLoading:writeLoading, error:writeErrorStatus}] = useWriteCommentMutation()
	
	const handleFollow = async() => {
	
		try{
			const request = await follow({username:post?.username,currentUser:user}).unwrap()
		}catch(err){
			console.log(err)
		}
	}
	
	
	const handleLike = async() => {	
		try{
			const request = await likePost({postID:post?._id,user}).unwrap()
		}catch(err){
			console.log(err)
		}
	}
	
	const handleDelete = async() => {
		try{
			let choice = confirm("Are you sure you want to delete?")
			if(choice === true){
				const request = await deletePost(post?._id).unwrap()
				if(request?.message){
					toastSuccess(request?.message)
				}
			}
			
		}catch(err){
			console.log(err)
			toastError(err?.data?.message)
			
		}
	}
	
	
	const handleWrite = async() => {
		if(user){
			try{
				const createdTime = new Date().toISOString()
				
				const request = await writeComment({...comment,postID:post?._id,createdTime}).unwrap()
				
				
				if(request.message){
					toastSuccess(request.message)
					setComment({username:user, comment:"", profilePicture:profilePicture})
					setTimeout(() => {
						navigation(`/post/${post?._id}`)
					},2000)
				}
			}catch(err){
				toastError(err?.data?.message)
			}
		}
		
	}
	
	
	
	return(
		<article className="post poppins-regular">
			<header className="postHeader">
				<div className="postUser">
					<img src={`${import.meta.env.VITE_SERVER_URL}/images/${post?.userDetails.profilePicture}`} onClick={() => navigation(`/profile/${post?.username}`)}/>
					<div className="postUserDetails">
						<span onClick={() => navigation(`/profile/${post?.username}`)}>{post?.username}</span>
						<span className="postLocation">{post?.location}</span>
					</div>
				</div>
				<div className="postOptions">
					{
						post?.userDetails?.followers?.includes(user) ? 
						<IoPersonRemoveSharp className="followButton" size={25} onClick={handleFollow} /> :
						user !== post?.username ? <IoPersonAdd className="followButton" size={25} onClick={handleFollow}/> : null
									 
					}					
					{
						post?.username === user ? 
						<MdDelete size={28} onClick={handleDelete} /> : null
					}
				</div>
			</header>
				
			<section className="postContent" onClick={() => navigation(`/post/${post._id}`)}>
				<img src={`${import.meta.env.VITE_SERVER_URL}/images/${post?.contentName}`} />
			</section>
			<footer className="postFooter">
				<header className="postButtons">
					<div className="postButtonsLeftSide">
						<FcLikePlaceholder  size={25}  onClick={handleLike}/>
						<FaRegComment  size={25} />
					</div>
					<div className="postButtonsRightSide">
						<div>{post?.likes.length} Likes</div>
						<div>{post?.comments.length} Comments</div>
					</div>
				</header>
				<section className="postCommentInput">
					<input type="text" value={comment?.comment} className="commentInputStyle" placeholder="Type your comment" name="comment" onChange={onChange} />
					<RiSendPlaneLine size={30} onClick={handleWrite} />
				</section>
				<footer className="postDetails">
					<span className="postDetailsSeeComments" onClick={() => navigation(`/post/${post?._id}`)}>Click here to see all comments</span>
					{format(post?.createdTime)}
				</footer>
			</footer>
			<ToastContainer />
		</article>
	)
}

