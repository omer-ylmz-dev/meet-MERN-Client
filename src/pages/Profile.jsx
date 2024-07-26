import ProfileDetails from "../components/profile/ProfileDetails"
import ProfileContents from "../components/profile/ProfileContents"
import LoadingScreen from "../components/loading/LoadingScreen"


import NotFound from "./NotFound"


import {useGetUserProfileQuery} from "../features/user/userApiSlice"

import {useParams} from "react-router-dom"

export default function Profile() {
	const {username} = useParams()
	
	
	
	
	const {data, isLoading, isSuccess, isError, error} = useGetUserProfileQuery(username)
	
	
	
	
	if(isLoading){
		return <LoadingScreen condition={isLoading}/>
	}
	
	if(isError && !isSuccess && !data){
		return <NotFound/>
	}
	
	if(isSuccess && !isLoading){
		document.title = `(@${username}) • Meet Posts`
		return(
			<section className="profile poppins-regular">
				<ProfileDetails details={data?.details} />
				<ProfileContents contents={data?.contents} />
			</section>
		)
	}
	
}