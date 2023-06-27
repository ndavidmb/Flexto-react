import { createSlice } from '@reduxjs/toolkit'
import {
  IState,
  IUserPayload,
} from '../../interfaces/auth/auth.interface'
import { UserRoles } from '../../../../auth/interfaces/user-roles.enums'

const initialValue: IState = {
  uid: '',
  email: '',
  displayName: '',
  photoUrl: '',
  role: UserRoles.CLIENT,
  agreement: '',
  isLogged: false
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
      state.isLogged = true
    },
    logout: (state) => {
      state.uid = ''
      state.email = ''
      state.displayName = ''
      state.photoUrl = ''
      state.role = UserRoles.CLIENT
      state.agreement = ''
      state.isLogged = false
    },
  },
})

export const { login, logout } = authSlice.actions
