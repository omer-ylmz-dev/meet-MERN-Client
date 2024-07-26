import {
	useGetCurrentUserDetailsQuery,
	useDeleteYourAccountMutation,
	useChangeMailAddressMutation,
	useChangeProfilePhotoMutation,
	useChangePasswordMutation
} from "../features/settings/settingsApiSlice"

import {useState} from "react"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import {toastSuccess,toastError} from "../utils/useToast"

import { ToastContainer } from 'react-toastify';


export default function Settings(){
	document.title = "meet | Settings"
	
	const navigation = useNavigate()
	const [pass,setPass] = useState("");
	const [content,setContent] = useState({});
	
	const {user} = useSelector(state => state.auth)
	const {data:details, isLoading, isSuccess, isUninitialized, isError, error} = useGetCurrentUserDetailsQuery(user)
	const [deleteAccount, {data:deleteStatus}] = useDeleteYourAccountMutation()
	const [changeMailAddress, {data:changeMailStatus}] = useChangeMailAddressMutation()
	const [changeProfilePhoto, {data:changeProfilePhotoStatus}] = useChangeProfilePhotoMutation()
	const [changePassword, {data:changePasswordStatus}] = useChangePasswordMutation()
	
	
	
	
	const onChange = (e) => setContent(e.target.files[0])
	
	const handleChangeMailAddress = async() => {
		try{
			let verify = prompt("Please enter your mail address")
			if(verify === details?.email){
				let enter = prompt("Please enter your new mail address")
				if(enter){
					const request = await changeMailAddress({currentUser:user,newMailAddress:enter}).unwrap()
					if(request.message){
						toastSuccess(request?.message)
					}
				}
			}
		}catch(err){
			console.log(err)
			toastError(err?.data?.message)
		}
	}
	
	
	const handleChangeProfilePhoto = async() => {
		
		try{
			
			const filename = `${user}_${Date.now()}.${content?.name.split(".")[1]}`
			
			const uploadedContent = new FormData()
	
			uploadedContent.append("currentUser",user)
			uploadedContent.append("contentName",filename)
			uploadedContent.append("content",content)
			
			
			const request = await changeProfilePhoto(uploadedContent).unwrap()
			if(request.message){
				toastSuccess(request?.message)
				setContent({})
			}
		}catch(err){
			console.log(err)
			toastError(err?.data?.message)
		}
	}
	
	
	const handleChangePassword = async() => {
		try{
			let choice = confirm("Are you sure you want to change your password?")
			if(choice === true){
				const request = await changePassword({currentUser:user,newPassword:pass}).unwrap()
				if(request.message){
					toastSuccess(request?.message)
				}
			}
		}catch(err){
			console.log(err)
			toastError(err?.data?.message)
		}
	}
	
	
	const handleDelete = async() => {
		try{
			let choice = confirm("Are you sure you want to delete your account?")
			if(choice === true){
				const request = await deleteAccount(user).unwrap()
				localStorage.clear()
				navigation("/")
			}
		}catch(err){
			console.log(err)
			toastError(err?.data?.message)
		}
	}
	
	
	
	
	
	
	
	if(!isLoading && isSuccess || isUninitialized){
		return(
			<section className="settings poppins-extralight">
				<article className="settingsContainer">
					<header className="settingsHeader">Settings</header>
					<section className="settingsSection">
						<div className="setting">
							<header className="settingHeader">
								
								<div className="settingName">Profile Photo</div>
								
								<div className="settingChangeButton" onClick={handleChangeProfilePhoto}>Change</div>
							</header>
							<section className="settingSection poppins-extralight">
								<div className="settingStatus">Your Profile Photo :</div>
								<img src={`${import.meta.env.VITE_SERVER_URL}/images/${details?.profilePicture ?? "profile.jpg"}`} />
								<label className="uploadButton" htmlFor="fileUploader">
									<input type="file" id="fileUploader" onChange={onChange} />
									<div className="settingChangeButton">Drop Here Your Photo</div>
								</label>
								<span>{content?.name}</span>
							</section>
						</div>
						<div className="setting">
							<header className="settingHeader">
								<div className="settingName">Password</div>
								
							</header>
							<section className="settingSection">
								<div className="settingStatus">Change password : </div>
								<input type="password" className="settingInput" onChange={(e) => setPass(e.target.value)} />
								<div className="settingChangeButton" onClick={handleChangePassword}>Change</div>
							</section>
						</div>
						<div className="setting">
							<header className="settingHeader">
								<div className="settingName">Mail Address</div>
								<div className="settingChangeButton" onClick={handleChangeMailAddress}>Change</div>
							</header>
							<section className="settingSection poppins-extralight">
								<div className="settingStatus">Your Mail Address : </div>
								<div className="settingStatus">{details?.email}</div>
							</section>
						</div>
					</section>
					<footer className="settingsFooter">
						<div className="setting">
							<header className="settingHeader">
								<div className="settingName">Delete Account</div>
							</header>
							<section className="settingSection">
								<div className="settingDeleteAccountButton" onClick={handleDelete}>Delete Account</div>
							</section>
						</div>
					</footer>
				</article>
				<ToastContainer />
			</section>
		)
	}
}