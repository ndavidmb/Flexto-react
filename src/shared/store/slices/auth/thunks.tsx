import { FirebaseError } from 'firebase/app'
import { AuthController } from '../../../../auth/controllers/auth.controller'
import { ToastList } from '../../../styled-components/ToastList'
import { AppDispatch } from '../../store'
import { setLoading } from '../loading/loadingSlice'
import { showToast } from '../toast/toastSlice'
import { login, logout } from './authSlice'

export const emailAndPasswordSignIn = (
  values: {
    email: string
    password: string
  },
  agreement: string,
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    const authController = AuthController(agreement)
    try {
      const result = await authController.signIn(values)
      dispatch(login(result))
    } catch (err) {
      if (err instanceof FirebaseError) {
        dispatch(
          showToast({
            type: 'error',
            title: 'Error en el ingreso',
            details: ['Usuario o contraseña invalida'],
          }),
        )
      }
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const startLogout = (agreement: string) => {
  return async (dispatch: AppDispatch) => {
    const authController = AuthController(agreement)
    await authController.logOut()
    dispatch(logout())
  }
}
