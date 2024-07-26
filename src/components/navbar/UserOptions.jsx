import {useLogoutMutation} from "../../features/auth/authApiSlice"
import {userOptionsScreen} from "../../features/screen/screenSlice"
import {useNavigate} from "react-router-dom"
import {forwardRef} from "react";

import {useSelector,useDispatch} from 'react-redux'



const UserOptions = forwardRef((props,ref) => {
	
	const dispatch = useDispatch()
	const navigation = useNavigate()
	const {user} = useSelector(state => state.auth)
	const [logout, {data, isLoading, error}] = useLogoutMutation()
	
	
	
	
	
	const handleUserNavigation = async() => {
		navigation(`/profile/${user}`)
		dispatch(userOptionsScreen(false))
	}
	
	const handleSettingsNavigation = async() => {
		navigation(`/settings`)
		dispatch(userOptionsScreen(false))
	}
	
	const handleLogout = async() => {
		try{
			const request = await logout().unwrap()
			navigation("/login")
			dispatch(userOptionsScreen(false))
		}catch(err){
			console.log(err)
		}
	}
	
	return(
		<div className="userOptions poppins-extralight" ref={ref}>
			<div className="userOption" onClick={handleUserNavigation}>{user}</div>	
			<div className="userOption" onClick={handleSettingsNavigation}>Settings</div>	
			<div className="userOption" onClick={handleLogout}>Log Out</div>	
		</div>
	)
})

export default UserOptions