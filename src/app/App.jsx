import Layout from "../components/Layout"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import PostViewer from "../pages/PostViewer"
import Settings from "../pages/Settings"
import Login from "../pages/Login"
import Register from "../pages/Register"
import NotFound from "../pages/NotFound"


import RequireAuth from "../components/private-routes/RequireAuth"
import Public from "../components/private-routes/Public"
import IsAuth from "../components/private-routes/IsAuth"

import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"




export default function App() {
		
	return(
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout/>}> 
						<Route element={<RequireAuth/>}>
							<Route index element={<Home />} />
							<Route path="settings" element={<Settings />} />
							<Route path="*" element={<NotFound />} />
						</Route>
						<Route element={<Public/>}>
							<Route path="/profile/:username" element={<Profile />} />
							<Route path="/post/:postID" element={<PostViewer />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Route>
					<Route element={<IsAuth/>}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}