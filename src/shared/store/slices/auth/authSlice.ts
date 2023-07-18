import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  IUserState,
  IUserPayload,
  USER_APPROVED_STATES,
} from '../../interfaces/auth/auth.interface'
import { UserRoles } from '../../../../auth/interfaces/user-roles.enums'

const initialValue: IUserState = {
  uid: '',
  email: '',
  displayName: '',
  photoUrl: '',
  role: UserRoles.CLIENT,
  agreement: '',
  userState: USER_APPROVED_STATES.NO_LOGGED,
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
      state.userState = payload.userState
    },
    logout: (state) => {
      state.uid = ''
      state.email = ''
      state.displayName = ''
      state.photoUrl = ''
      state.role = UserRoles.CLIENT
      state.agreement = ''
      state.userState = USER_APPROVED_STATES.NO_LOGGED
    },

    registerProcess: (state) => {
      state = {
        ...state,
        userState: USER_APPROVED_STATES.PENDING,
      }
    },

    updateOwnerState: (
      state,
      {
        payload,
      }: PayloadAction<
        Pick<IUserState, 'displayName' | 'photoUrl'>
      >,
    ) => {
      state.displayName = payload.displayName
      state.photoUrl = payload.photoUrl
    },
  },
})

export const {
  login,
  logout,
  registerProcess,
  updateOwnerState,
} = authSlice.actions
