import {useRegisterMutation} from "../features/auth/authApiSlice"
import {useState} from "react"
import {Link} from "react-router-dom"

import {toastError} from "../utils/useToast"

import { ToastContainer } from 'react-toastify';



export default function Register() {
	 
	document.title = "meet | Register"
	const [registerForm,setRegisterForm] = useState({email:"",username:"",passw:"",isAgreed:false})
	
	const [register, {data, isLoading, error}] = useRegisterMutation()
	
	
	
	
	const onChange = (e) => {
		if(e.target.type === "checkbox"){
			setRegisterForm(prev => ({...prev, [e.target.name] : e.target.checked}))
		}else{
			setRegisterForm(prev => ({...prev, [e.target.name] : e.target.value}))
		}
	}
	
	
	
	const handleRegister = async() => {
		try{
			const request = await register(registerForm).unwrap()
			console.log(request)
		}catch(err){
			console.log(err)
			toastError(err?.data?.message)
		}
	}
	
	
	return(
		<section className="registerScreen poppins-extralight">
			<a href="https://github.com/omer-ylmz-dev" target="_blank" className="developedBy">developed by omer-ylmz-dev</a>
			<article className="registerScreenContainer">
				<div className="registerScreenLeftSide">
					<header className="brand">
						meet
					</header>
					<article className="tagline">
						Meet new people and share your life with them
					</article>
					
				</div>
				<div className="registerScreenRightSide">
					<input type="text" className="inputStyle poppins-extralight" placeholder="Your Mail Address" name="email" onChange={onChange} />
					<input type="text" className="inputStyle poppins-extralight" placeholder="Choose Username" name="username" onChange={onChange} />
					<input type="password" className="inputStyle poppins-extralight" placeholder="Choose Password" name="passw" onChange={onChange}/>
					<div className="registerScreenCheckbox">
						<input type="checkbox" name="isAgreed" onChange={onChange} /><span>I Agree all <a href="#">terms</a></span>
					</div>
					<button type="button" className="authButton buttonStyle poppins-extralight" onClick={handleRegister} disabled={isLoading ? true : false}>Create Account</button>
					<footer className="formQuestion poppins-extralight">Have an account? <Link to="/login">Login</Link></footer>
				</div>
			</article>
			<ToastContainer />
		</section>
	)
}

