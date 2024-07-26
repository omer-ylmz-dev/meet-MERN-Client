export default function FileUploader({onChange}){
	
	return(
		<label htmlFor="fileUploader" className="postEditorFileUploader">
			<input type="file" required id="fileUploader" onChange={onChange} />
			<div>Please drag and drop your file here</div>
		</label>
	)
}