import Content from "./Content"


export default function ProfileContents({contents}){
	
	
	return(
		<section className="profileContents">
		{
			contents?.posts?.map((post,i) =>
				<Content post={post} key={i} />
			)
		}
		</section>
	)
}