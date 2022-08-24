import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlice'
import { loadingSlice } from './slices/loading/loadingSlice'
import { themeSlice } from './slices/theme/themeSlice'

export const store = configureStore({
  reducer: {
    loadingState: loadingSlice.reducer,
    themeState: themeSlice.reducer,
    authState: authSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
