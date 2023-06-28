import { User } from 'firebase/auth'
import { IExtraUser } from '../../../../auth/interfaces/user.interface'
import { AppDispatch } from '../../store'
import { login, logout } from './authSlice'

export const validateUser = (
  user: User,
  extraUser: IExtraUser,
  agreement: string
) => {
  return async (
    dispatch: AppDispatch,
  ) => {
    const { displayName, email, photoURL, uid } = user

    dispatch(
      login({
        approved: extraUser.accepted,
        displayName: displayName as string,
        email: email as string,
        photoUrl: photoURL as string,
        agreement,
        role: extraUser.role,
        uid,
        isLogged: true
      }),
    )
    return true
  }
}

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(logout())
  }
}
