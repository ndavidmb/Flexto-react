import { configureStore } from '@reduxjs/toolkit'
import { loadingSlice } from './slices/loading/loadingSlice'
import { themeSlice } from './slices/theme/themeSlice'

export const store = configureStore({
  reducer: {
    loadingState: loadingSlice.reducer,
    themeState: themeSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
