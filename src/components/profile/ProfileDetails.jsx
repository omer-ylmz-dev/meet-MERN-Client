import {useSelector} from "react-redux"
import {useFollowMutation} from "../../features/user/userApiSlice"

import {toastError} from "../../utils/useToast"

import { ToastContainer } from 'react-toastify';


export default function ProfileDetails({details}){
	
	const {user} = useSelector(state => state.auth)
	const [follow, {data, isLoading, error}] = useFollowMutation()
	
	
	const handleFollow = async() => {
	
		try{
			const request = await follow({username:details?.username,currentUser:user}).unwrap()
		}catch(err){
			console.log(err)
			toastError(err?.data?.message)
		}
	}
	
	
	return(
		<header className="profileDetails">
			<article className="profileDetailsLeftSide">
				<div className="profileDetailsUserPhoto">
					<img src={`${import.meta.env.VITE_SERVER_URL}/images/${details?.profilePicture ?? "profile.jpg"}`} />
				</div>
			</article>
			<article className="profileDetailsRightSide">
				<header className="profileDetailsHeader">
					<div className="profileDetailsUsername">{details?.username}</div>
					{
						user !== details?.username ? 
						<div className="profileDetailsButton" onClick={handleFollow}>
							{
								details?.followers?.includes(user) ? "Following" : "Follow"
							}
						</div> 
						: null
					}
					{
						user !== details?.username ? 
						<div className="profileDetailsButton">Send Message</div> 
						: null
					}
				</header>
				<section className="profileDetailsSection">
					<div>{details?.postCount} Photos</div>
					<div>{details?.followers?.length} Followers</div>
					<div>{details?.followings?.length} Following</div>
				</section>
				<footer className="profileDetailsFooter">
					<div>This is my profile</div>
				</footer>
			</article>
		</header>
	)
}