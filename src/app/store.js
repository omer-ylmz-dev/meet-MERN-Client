import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { meetAPI } from './services/meetAPI'
import screenSlice from '../features/screen/screenSlice'
import authSlice from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
	screen: screenSlice,
	auth: authSlice,
    [meetAPI.reducerPath]: meetAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(meetAPI.middleware),
})

setupListeners(store.dispatch)