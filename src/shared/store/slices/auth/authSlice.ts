import { createSlice } from '@reduxjs/toolkit'
import {
  IState,
  IUserPayload,
} from '../../interfaces/auth/auth.interface'

const initialValue: IState = {
  uid: '',
  email: '',
  displayName: '',
  photoUrl: '',
  role: null,
  agreement: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValue,
  reducers: {
    login: (state, { payload }: IUserPayload) => {
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoUrl = payload.photoUrl
      state.agreement = payload.agreement
      state.role = payload.role
    },
    logout: (state) => {
      state.uid = ''
      state.email = ''
      state.displayName = ''
      state.photoUrl = ''
      state.role = null
      state.agreement = ''
    },
  },
})

export const { login, logout } = authSlice.actions
