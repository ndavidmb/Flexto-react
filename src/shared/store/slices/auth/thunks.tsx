import { User } from 'firebase/auth'
import { IExtraUser } from '../../../../auth/interfaces/user.interface'
import { AppDispatch } from '../../store'
import { login, logout } from './authSlice'
import { USER_APPROVED_STATES } from '../../interfaces/auth/auth.interface'

export const validateUser = (
  user: User,
  extraUser: IExtraUser,
  agreement: string,
) => {
  return async (dispatch: AppDispatch) => {
    const { displayName, email, photoURL, uid } = user

    dispatch(
      login({
        userState: extraUser.accepted
          ? USER_APPROVED_STATES.APPROVED
          : USER_APPROVED_STATES.PENDING,
        displayName: displayName as string,
        email: email as string,
        photoUrl: photoURL as string,
        agreement,
        role: extraUser.role,
        uid,
      }),
    )
    return true
  }
}
