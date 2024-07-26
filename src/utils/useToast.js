import { toast, ToastContainer, Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



export const toastSuccess = (data) => {
	return toast.success(data, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Slide,
	});
}


export const toastError = (data) => {
	return toast.error(data, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Slide,
	});
}
