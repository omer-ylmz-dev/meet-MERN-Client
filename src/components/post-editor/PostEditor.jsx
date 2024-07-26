import { IoMdClose } from "react-icons/io";
import FileUploader from "./FileUploader"
import UploadedFile from "./UploadedFile"

import {useCreatePostMutation} from "../../features/post/postApiSlice"

import {useState} from "react"

import {createPostScreen} from "../../features/screen/screenSlice"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import Loading from "../loading/Loading"

export default function PostEditor(){
	const dispatch = useDispatch()
	const navigation = useNavigate()
	const {user,profilePicture} = useSelector(state => state.auth)
	const [showUploadedImage,setShowUploadedImage] = useState("");
	const [content,setContent] = useState({});
	const [createdPost,setCreatedPost] = useState({username:user, description:"", location:""})
	
	
	
	const [createPost, {data, isLoading}] = useCreatePostMutation()
	
	
	
	const onChange = (e) => {
		if(e.target.type === "file"){
			setContent(e.target.files[0])
			setShowUploadedImage(e.target.files[0] === showUploadedImage ? showUploadedImage : URL.createObjectURL(e.target.files[0]))
		}else{
			setCreatedPost(prev => ({...prev,[e.target.name] : e.target.value}))
		}
	}

	
	const handleCreate = async() => {
		
		try{
			const filename = `${content?.name.split(".")[0]}_${Date.now()}.${content?.name.split(".")[1]}`
		
			const createdTime = new Date().toISOString()
			
			const uploadedContent = new FormData()
		
			uploadedContent.append("username",createdPost.username)
			uploadedContent.append("description",createdPost.description)
			uploadedContent.append("location",createdPost.location)
			uploadedContent.append("createdTime",createdTime)
			uploadedContent.append("contentName",filename)
			uploadedContent.append("content",content)
			
			const requestUpload = await createPost(uploadedContent).unwrap()
			
			if(requestUpload?.status){
				dispatch(createPostScreen())
				navigation("/")
				document.querySelector(".postStreaming").scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
			
		}catch(err){
			console.log(err)
		}
		
		
		
		
	}
	
	
	
	const handleDelete = () => {
		setShowUploadedImage("")
		setContent({})
	}
	
	return(
		<section className="postEditor poppins-extralight">
			<article className="postEditorContainer">
				<IoMdClose className="closeButton" size={25} onClick={() => dispatch(createPostScreen())} />
				<div className="postEditorLeftSide">
					<header className="postEditorHeader">Add your photo</header>
					<section className="postEditorLeftSection">
						{showUploadedImage ? <UploadedFile uploaded={showUploadedImage} handleDelete={handleDelete} /> : <FileUploader onChange={onChange}/>}
					</section>
				</div>
				<div className="postEditorRightSide">
					<header className="postEditorHeader">Add your content's details</header>
					<section className="postEditorRightSection">
						<div className="postEditorContentDetail">
							<textarea name="description" className="poppins-extralight" onChange={onChange} placeholder="Write a description"></textarea>
						</div>
						<div className="postEditorContentDetail">
							<input type="text" name="location" className="poppins-extralight" onChange={onChange} placeholder="Add your location" />
						</div>
						<div className="postEditorButton" onClick={handleCreate}>Share Your Content</div>
						<div className="postEditorLoading">
							{isLoading ? <Loading condition={isLoading} /> : null}
						</div>
					</section>
				</div>
			</article>
		</section>
	)
}