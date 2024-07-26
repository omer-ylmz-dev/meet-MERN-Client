import {useLoginMutation} from "../features/auth/authApiSlice"
import {useState} from "react"
import {Link} from "react-router-dom"

import { ToastContainer } from 'react-toastify';

import {toastError} from "../utils/useToast"



export default function Login() {
	
	 
	 document.title = "meet | Login"
	 const [loginForm,setLoginForm] = useState({email:"",passw:""})
	 
	 
	 const [login, {data, isLoading, error}] = useLoginMutation()
	 
	 const onChange = (e) => setLoginForm(prev => ({...prev, [e.target.name] : e.target.value}))
	 
	 const handleLogin = async() => {
		try{
			const request = await login(loginForm).unwrap()
			console.log(request)
		}catch(err){
			console.log(err)
			toastError(err?.data?.message)
		}
	}
	
	 
	return(
		<section className="loginScreen poppins-extralight">
			<a href="https://github.com/omer-ylmz-dev" target="_blank" className="developedBy">developed by omer-ylmz-dev</a>
			<article className="loginScreenContainer">
				<div className="loginScreenLeftSide">
					<header className="brand">
						meet
					</header>
					<article className="tagline">
						Meet new people and share your life with them
					</article>
				</div>
				<div className="loginScreenRightSide">
					<input type="text" className="inputStyle poppins-extralight" placeholder="Mail Address" name="email" onChange={onChange} />
					<input type="password" className="inputStyle poppins-extralight" placeholder="Password" name="passw" onChange={onChange} />
					<button type="button" className="authButton buttonStyle poppins-extralight" onClick={handleLogin} disabled={isLoading ? true : false}>Login</button>
					<footer className="formQuestion">Don't you have an account? <Link to="/register">Register</Link></footer>
				</div>
			</article>
			<ToastContainer />
		</section>
	)
}

