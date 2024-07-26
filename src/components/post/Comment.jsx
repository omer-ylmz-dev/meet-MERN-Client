import {format} from "timeago.js"

export default function Comment({comment}) {
	console.log(comment)
	return (
		<div className="comment">
			<div className="commentUpperSide">
				
					<div className="commentProfilePhotoContent">
						<img src={`${import.meta.env.VITE_SERVER_URL}/images/${comment?.profilePicture}`}  />
					</div>
				
				<div className="commentText">
					<div className="commentProfileName">
						{comment?.username}
					</div>
					<div className="commentTextContent">
						{comment?.comment}
					</div>
				</div>
			</div>
			<div className="commentLowerSide">
				<div className="commentSharedDate">
					{format(comment?.createdTime)}
				</div>
			</div>
		</div>
	)
}

