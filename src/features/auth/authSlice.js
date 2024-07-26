import {createSlice} from "@reduxjs/toolkit";
import {meetAPI} from '../../app/services/meetAPI';
import {decryptData,encryptData,decodeJWT} from "../../utils/useCrypto"


const initialState = {
	user: null,
	profilePicture:null,
}


export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers:{
		setUser: (state,action) => {
			if(JSON.parse(decryptData(localStorage.getItem("sessionID"))) !== action.payload.accessToken){
				localStorage.setItem("sessionID",encryptData(JSON.stringify(action.payload.accessToken)))
			}
			state.user = decodeJWT(action.payload.accessToken).username
			state.profilePicture = action.payload.profilePicture
		},
		logout: (state) => {
			state.user = null
			state.profilePicture = null
			localStorage.clear()
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(meetAPI.endpoints.verifyRefreshToken.matchFulfilled, (state, action) => {
			console.log(action.payload)
			if(JSON.parse(decryptData(localStorage.getItem("sessionID"))) !== action.payload.accessToken){
				localStorage.setItem("sessionID",encryptData(JSON.stringify(action.payload.accessToken)))
			}
			
			state.user = decodeJWT(action.payload.accessToken).username
			state.profilePicture = action.payload.profilePicture
		})
		builder.addMatcher(meetAPI.endpoints.login.matchFulfilled, (state, action) => {
			console.log(action.payload)
			if(!JSON.parse(localStorage.getItem("sessionID"))){
				localStorage.setItem("sessionID",encryptData(JSON.stringify(action.payload.accessToken)))
			}

			state.user = decodeJWT(action.payload.accessToken).username
			state.profilePicture = action.payload.profilePicture
		})
		builder.addMatcher(meetAPI.endpoints.register.matchFulfilled, (state, action) => {
			if(!JSON.parse(localStorage.getItem("sessionID"))){
				localStorage.setItem("sessionID",encryptData(JSON.stringify(action.payload.accessToken)))
			}
			
			state.user = decodeJWT(action.payload.accessToken).username
			state.profilePicture = action.payload.profilePicture
		})
		builder.addMatcher(meetAPI.endpoints.deleteYourAccount.matchFulfilled, (state, action) => {
			state.user = null
			state.profilePicture = null
			localStorage.clear()
		})
		builder.addMatcher(meetAPI.endpoints.changeProfilePhoto.matchFulfilled, (state, action) => {
			state.profilePicture = action.payload.picture
		})
  }
})

export const {setUser,logout} = authSlice.actions;

export default authSlice.reducer;