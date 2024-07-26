import Navbar from "../components/navbar/Navbar"
import {Link} from "react-router-dom"

export default function NotFound(){
	document.title = "404 || meet"
	return(
		<>
			<Navbar />
			<section className="notFoundContainer ">
				<header className="notFoundHeader poppins-regular">Oops!</header>
				<section className="notFoundSection poppins-extralight">
					<div>Page Not Found</div>
					<Link to="/" className="notFoundGoHome">Go to Homepage</Link>
				</section>
			</section>
		</>
	)
}

