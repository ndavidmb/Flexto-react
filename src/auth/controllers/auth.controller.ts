import { FirebaseError } from 'firebase/app'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../shared/store/hooks'
import { startLogout } from '../../shared/store/slices/auth/thunks'
import { RootState } from '../../shared/store/store'
import { useAuthFacade } from '../facades/auth.facade'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { IUser } from '../interfaces/user.interface'
import { login } from '../../shared/store/slices/auth/authSlice'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'

export function useAuthController() {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )
  const authFacade = useAuthFacade()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const logOut = async () => {
    dispatch(startLogout(theme.id))
    navigate(`/${theme.id}/auth`)
    return await authFacade.logOut()
  }

  const register = async (
    registerFb: IRegisterFirebase,
  ): Promise<{
    ok: boolean
    user: IUser
  }> => {
    return await authFacade.registerUser(registerFb)
  }

  return { signIn, logOut, register }
}
