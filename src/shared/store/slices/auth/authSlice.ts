import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../../../auth/interfaces/user.interface'

interface IState extends IUser {
  agreement: string
}

interface IUserPayload {
  payload: IState
}

const initialValue: IState = {
  uid: '',
  email: '',
  displayName: '',
  photoUrl: '',
  role: 'client',
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
    },
    logout: (state) => {
      state.uid = ''
      state.email = ''
      state.displayName = ''
      state.photoUrl = ''
      state.role = 'client'
      state.agreement = ''
    },
  },
})

export const { login, logout } = authSlice.actions
