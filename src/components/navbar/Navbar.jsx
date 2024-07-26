import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";
import { ImCompass2 } from "react-icons/im";
import { IoSearchOutline } from "react-icons/io5";
import { VscDiffAdded } from "react-icons/vsc";

import PostEditor from "../post-editor/PostEditor"
import UserOptions from "./UserOptions"
import UserSearch from "./UserSearch"
import SearchResult from "./SearchResult"

import {useSearchUserMutation} from "../../features/user/userApiSlice"

import {createPostScreen,userOptionsScreen} from "../../features/screen/screenSlice"

import {useState,useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import useClickOutside from "../../hooks/useClickOutside"


export default function Navbar() {
	const navigation = useNavigate()
	const dispatch = useDispatch()
	
	const sessionID = localStorage.getItem("sessionID") ? true : false
	
	
	const {user,profilePicture} = useSelector(state => state.auth)
	const {createPostScreenStatus,userOptionsScreenStatus} = useSelector(state => state.screen)
	
	const [search, {data, isLoading, isSuccess, isError, error}] = useSearchUserMutation()
	
	const reference = useClickOutside(() => dispatch(userOptionsScreen(false)));
	
	const [searchTag,setSearchTag] = useState("")
	
	
	
	const Open = (e) => {
		e.stopPropagation()
		dispatch(userOptionsScreen(true))
	}
	
	const searchUser = async() => {
		try{
			const request = await search(searchTag).unwrap()
		}catch(err){
			console.log(err)
		}
	}
	
	
	
	useEffect(() => {
		
		if(searchTag){
			
			const timeout = setTimeout(searchUser,500)
			return () => {
				clearTimeout(timeout)
			}
		}
		
	},[searchTag])
	
	
	
	
	return(
		<nav className="navbar">
			<header className="navbarHeader">
				<div className="navbarBrand poppins-extralight" onClick={() => navigation("/")}>meet</div>
			</header>
			<section className="navbarSection">
				<input type="search" placeholder="Search" value={searchTag} className="searchInputStyle poppins-regular" onChange={(e) => setSearchTag(e.target.value)}/>
				<IoSearchOutline size={25} className="searchSymbol" />
				
				{searchTag !== "" && data ? <UserSearch data={data} setSearchTag={setSearchTag} /> : null}
				
			</section>
			<footer className="navbarFooter">
				{
					sessionID ? (
						<>
							<div className="navbarFooterLeftSide">
								<VscDiffAdded size={25} onClick={() => dispatch(createPostScreen())} className="navbarButton" />
							</div>
							{createPostScreenStatus ? <PostEditor /> : null}
							<div className="navbarFooterRightSide">
								<img src={`${import.meta.env.VITE_SERVER_URL}/images/${profilePicture ?? "profile.jpg"}`} className="navbarUser" onClick={Open} />
							</div>
							{userOptionsScreenStatus ? <UserOptions ref={reference} /> : null}
						</>
					) : null
				}
			</footer>
		</nav>
	)
}

