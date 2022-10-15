import { createSlice } from '@reduxjs/toolkit'

interface IState {
  status: boolean
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null
  errorMessage: string | null
}

const initialValue: IState = {
  status: false,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValue,
  reducers: {
    login: (state, { payload }) => {
      state.status = true
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      state.errorMessage = null
    },
    logout: (state, { payload }) => {
      state.status = false
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload.errorMessage
    },

    hideError: (state) => {
      state.errorMessage = null
    },
  },
})

export const { login, logout, hideError } =
  authSlice.actions
