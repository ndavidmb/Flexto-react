import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
  loading: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialValue,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setLoading } = loadingSlice.actions
