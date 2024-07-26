import {useEffect,useRef} from "react"

export default function useClickOutside(callback){
	const ref = useRef()
	
	useEffect(() => {
		const clickHandle = (e) => {
			if(ref.current && !ref.current.contains(e.target)){
				callback()
			}
		}
		
		document.addEventListener("click",clickHandle)
		
		return() => {
			document.removeEventListener("click",clickHandle)
		}
	},[ref])
	
	
	return ref
}