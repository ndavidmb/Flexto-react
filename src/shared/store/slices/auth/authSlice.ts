import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../../../auth/interfaces/user.interface'

interface IState extends IUser {
  status: boolean
}

const initialValue: IState = {
  status: false,
  uid: '',
  email: '',
  displayName: '',
  photoUrl: '',
  role: 'client',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValue,
  reducers: {
    login: (state, { payload }: { payload: IUser }) => {
      state.status = true
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoUrl = payload.photoUrl
    },
    logout: (state) => {
      state.status = false
      state.uid = ''
      state.email = ''
      state.displayName = ''
      state.photoUrl = ''
      state.role = 'client'
    },
  },
})

export const { login, logout } = authSlice.actions
