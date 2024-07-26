import { MdDeleteForever } from "react-icons/md";

export default function UploadedFile({uploaded,handleDelete}){
	
	return(
		<div className="postEditorUploadedFile">
			<img src={uploaded} />
			{uploaded ? <MdDeleteForever size={30} onClick={handleDelete} className="postEditorUploadedFileDeleteButton" /> : null}
		</div>
	)
}