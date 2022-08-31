import {
  logoutFirebase,
  signIn,
  signInGoogle,
} from '../../../../auth/services/auth.service'
import { AppDispatch } from '../../store'
import { setLoading } from '../loading/loadingSlice'
import { login, logout } from './authSlice'

export const emailAndPasswordSignIn = (values: {
  email: string
  password: string
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))

    const result = await signIn(values)

    if (!result.ok)
      dispatch(
        logout({ errorMessage: result.errorMessage }),
      )
    else dispatch(login(result))

    dispatch(setLoading(false))
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))

    const result = await signInGoogle()

    if (!result.ok)
      dispatch(
        logout({ errorMessage: result.errorMessage }),
      )
    else dispatch(login(result))

    dispatch(setLoading(false))
  }
}

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    await logoutFirebase()
    dispatch(logout(''))
  }
}
