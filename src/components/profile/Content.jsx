import {useNavigate} from "react-router-dom"

export default function Content({post}){
	const navigation = useNavigate()
	
	
	return(
		<div className="content" onClick={() => navigation(`/post/${post?._id}`)}>
			<img src={`${import.meta.env.VITE_SERVER_URL}/images/${post?.contentName}`} />
		</div>
	)
}