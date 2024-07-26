import {TailSpin} from 'react-loader-spinner'

export default function Loading({condition}){
	return(
		<div className="loadingSpinner">
			<TailSpin
			visible={condition ? true : false}
			height="40"
			width="40"
			color="rgb(246,191,253)"
			ariaLabel="tail-spin-loading"
			radius="1"
			wrapperStyle={{}}
			wrapperClass=""
			/>
		</div>
	)
}