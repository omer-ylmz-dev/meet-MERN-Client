import Loading from "./Loading"

export default function LoadingScreen({condition}) {
	return (
		<div className="loadingScreenContainer">
			<div className="loadingScreen">
				<div className="loadingScreenContent">
					<Loading condition={condition} />
				</div>
			</div>
		</div>
	)
}