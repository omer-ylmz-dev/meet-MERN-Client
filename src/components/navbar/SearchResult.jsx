import {useNavigate} from "react-router-dom"

export default function SearchResult({result,setSearchTag}){
	const navigation = useNavigate()
	
	const onClick = () => {
		navigation(`/profile/${result?.username}`)
		setSearchTag("")
	}
	
	return(
		
			<section className="navbarSearch" onClick={onClick}>
				<div className="navbarSearchLeftSide">
					<img src={`${import.meta.env.VITE_SERVER_URL}/images/${result?.profilePicture}`}/>
				</div>
				<div className="navbarSearchRightSide">{result?.username}</div>
			</section>
		
	)
}