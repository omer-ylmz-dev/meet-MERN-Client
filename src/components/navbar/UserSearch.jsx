import SearchResult from "./SearchResult"

export default function UserSearch({data,setSearchTag}){
	
	return(
		<>	
			<div className="navbarSearchContainer poppins-extralight">
				{
					data?.length !== 0 ? data?.map((d,i) => 
						<SearchResult key={i} result={d} setSearchTag={setSearchTag}/>
					) : <span className="searchResultFalse">User is not found</span>
				}
			</div>
		</>
	)
}


