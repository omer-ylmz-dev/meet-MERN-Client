import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	createPostScreenStatus: false,
	editPostScreenStatus: false,
	userOptionsScreenStatus: false,
	postOptionsScreenStatus: false,
}


export const screenSlice = createSlice({
	name: "screen",
	initialState,
	reducers:{
		editPostScreen: (state,action) => {
			if(state.editPostScreenStatus){
				state.editPostScreenStatus = false;
			}else{
				state.editPostScreenStatus = action.payload;
			}
		},
		createPostScreen: (state) => {
			state.createPostScreenStatus = !state.createPostScreenStatus;
		},
		userOptionsScreen: (state,action) => {
			console.log(action.payload)
			if(state.userOptionsScreenStatus){
				state.userOptionsScreenStatus = false;
			}else{
				state.userOptionsScreenStatus = action.payload;
			}
		},
		postOptionsScreen: (state) => {
			state.optionsScreenStatus = !state.optionsScreenStatus;
		}
	}
})

export const {editPostScreen,createPostScreen,userOptionsScreen,postOptionsScreen} = screenSlice.actions;

export default screenSlice.reducer;
