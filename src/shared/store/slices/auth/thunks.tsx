import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
import { useAuthController } from '../../../../auth/controllers/auth.controller'
import { AppDispatch, RootState } from '../../store'
import { setLoading } from '../loading/loadingSlice'
import { showToast } from '../toast/toastSlice'
import { login, logout } from './authSlice'
import { useAuthFacade } from '../../../../auth/facades/auth.facade'
import { IExtraUser } from '../../../../auth/interfaces/user.interface'

export const emailAndPasswordSignIn = (values: {
  email: string
  password: string
}) => {
  return async (
    dispatch: AppDispatch,
    getState: () => RootState,
  ) => {
    const agreement = getState().themeState.theme?.id
    dispatch(setLoading(true))
    const authController = useAuthController(agreement)
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

export const validateUser = (
  user: User,
  extraUser: IExtraUser,
) => {
  return async (
    dispatch: AppDispatch,
    getState: () => RootState,
  ) => {
    const { displayName, email, photoURL, uid } = user

    dispatch(
      login({
        displayName: displayName as string,
        email: email as string,
        photoUrl: photoURL as string,
        // agreement,
        role: extraUser.role,
        uid,
      }),
    )
    return true
  }
}

export const startLogout = (agreement: string) => {
  return async (dispatch: AppDispatch) => {
    const authController = useAuthController(agreement)
    await authController.logOut()
    dispatch(logout())
  }
}
