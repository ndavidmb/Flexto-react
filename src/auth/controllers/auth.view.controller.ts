import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ALERT_MESSAGES } from '../../shared/constants/alert-messages.constants'
import { useAppDispatch } from '../../shared/store/hooks'
import {
  IUserState,
  USER_APPROVED_STATES,
} from '../../shared/store/interfaces/auth/auth.interface'
import {
  login,
  logout,
} from '../../shared/store/slices/auth/authSlice'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { useAuthModelController } from './auth.model.controller'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { UserRoles } from '../interfaces/user-roles.enums'
import { ValidateError } from '../../shared/errors/validate-error'

export function useAuthViewController(themeId: string) {
  const authModelController = useAuthModelController()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const signInWithEmailAndPassword = async (credentials: {
    email: string
    password: string
  }) => {
    dispatch(setLoading(true))

    try {
      const extraUser =
        await authModelController.signInWithEmailAndPassword(
          credentials,
          themeId,
        )

      dispatch(login(extraUser))
      getRedirectPath(extraUser)
    } catch (err) {
      console.error(err)
      if (
        err instanceof ValidateError &&
        err.message === 'user_deleted'
      ) {
        dispatch(
          showToast({
            title:
              'Su cuenta ha sido eliminada por el administrador',
            details: [
              'Puede contactar con el administrador para validar esta información',
            ],
            type: 'info',
          }),
        )
        logOut()
        return
      }

      if (err instanceof FirebaseError) {
        dispatch(
          showToast({
            type: 'error',
            title: 'Error en el ingreso',
            details: ['Usuario o contraseña invalida'],
          }),
        )
        logOut()
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const signInFirebase = async (user: User | null) => {
    if (!user) {
      navigate(`/${themeId}/auth`, { replace: true })
      return
    }

    dispatch(setLoading(true))
    try {
      const extraUser =
        await authModelController.getExtraUser(
          themeId,
          user,
        )
      dispatch(login(extraUser))
      getRedirectPath(extraUser)
    } catch (err) {
      if (err instanceof FirebaseError) {
        dispatch(
          showToast({
            type: 'error',
            title: 'Error en el ingreso',
            details: [
              'No se pudo autenticar correctamente',
            ],
          }),
        )
        logOut()
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const logOut = async () => {
    dispatch(setLoading(true))
    try {
      dispatch(logout())
      await authModelController.logOut()
      navigate(`/${themeId}/auth`, {
        replace: true,
      })
    } finally {
      dispatch(setLoading(false))
    }
  }

  const register = async (
    registerFb: IRegisterFirebase,
  ) => {
    dispatch(setLoading(true))

    try {
      const res = await authModelController.registerUser(
        registerFb,
      )
      if (!res) {
        return
      }

      dispatch(
        login({
          ...res.user,
          agreement: themeId,
          userState: USER_APPROVED_STATES.PENDING,
        }),
      )
      navigate(`/${themeId}/home/wait-approved`, {
        replace: true,
      })
    } catch (err) {
      console.error(err)
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
    }
  }

  const getRedirectPath = (user: IUserState) => {
    if (user.userState === USER_APPROVED_STATES.PENDING) {
      navigate(`/${themeId}/home/wait-approved`, {
        replace: true,
      })
      return
    }

    const url = new URL(location.href)

    if (user.role === UserRoles.CLIENT) {
      const navigateUrl = url.pathname.includes('auth')
        ? `/${themeId}/home/request`
        : `/${url.pathname}`

      navigate(navigateUrl, {
        replace: true,
      })
      return
    }

    if (user.role === UserRoles.ADMIN) {
      const navigateUrl = url.pathname.includes('auth')
        ? `/${themeId}/home/owners`
        : `/${url.pathname}`

      navigate(navigateUrl, {
        replace: true,
      })
    }
  }

  return {
    signInWithEmailAndPassword,
    logOut,
    register,
    getRedirectPath,
    signInFirebase,
  }
}
