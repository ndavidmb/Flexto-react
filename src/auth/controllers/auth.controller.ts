import { FirebaseError } from 'firebase/app'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ALERT_MESSAGES } from '../../shared/constants/alert-messages.constants'
import { useAppDispatch } from '../../shared/store/hooks'
import { login } from '../../shared/store/slices/auth/authSlice'
import { startLogout } from '../../shared/store/slices/auth/thunks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { RootState } from '../../shared/store/store'
import { useAuthFacade } from '../facades/auth.facade'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { setLoginEnds } from '../../shared/services/register.service'

export function useAuthController() {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )
  const authFacade = useAuthFacade()
  const dispatch = useAppDispatch()

  const signIn = async (credentials: {
    email: string
    password: string
  }) => {
    dispatch(setLoading(true))
    try {
      const loggedUser = await authFacade.signIn(
        credentials,
        theme.id,
      )
      dispatch(login({ ...loggedUser, isLogged: true }))
    } catch (err) {
      if (err instanceof FirebaseError) {
        dispatch(
          showToast({
            type: 'error',
            title: 'Error en el ingreso',
            details: ['Usuario o contraseña invalida'],
          }),
        )
        dispatch(startLogout())
      }
    } finally {
      dispatch(setLoading(false))
      setLoginEnds()
    }
  }

  const logOut = async () => {
    try {
      dispatch(startLogout())
      return await authFacade.logOut()
    } finally {
      setLoginEnds()
    }
  }

  const register = async (
    registerFb: IRegisterFirebase,
  ) => {
    dispatch(setLoading(true))

    try {
      const res = await authFacade.registerUser(registerFb)
      if (!res) {
        return
      }

      dispatch(
        login({
          ...res.user,
          agreement: theme.id,
          isLogged: true,
        }),
      )
    } catch (err) {
      if (err instanceof FirebaseError) {
        dispatch(
          showToast({
            title: 'Error al crear el usuario',
            details: [ALERT_MESSAGES[err.code]],
            type: 'error',
          }),
        )
      }
    } finally {
      dispatch(setLoading(false))
      setLoginEnds()
    }
  }

  return { signIn, logOut, register }
}
