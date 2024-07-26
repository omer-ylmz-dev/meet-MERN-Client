import Post from "../components/post/Post"
import Loading from "../components/loading/Loading"

import {useGetTimelineQuery} from "../features/post/postApiSlice"

import {useSelector} from "react-redux"


export default function Home() {
	document.title = "meet"
	
	const {user} = useSelector(state => state.auth)
	const {data:posts, isLoading} = useGetTimelineQuery(user)
	return (
		<main className="postStreaming">
		<Loading condition={isLoading} />
			{
				posts?.length !== 0 && posts?.map((post,i) => 
					<Post post={post} key={i}/>
				)
			}
		</main>
	)
}

