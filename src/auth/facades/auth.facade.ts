import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { UserRoles } from '../interfaces/user-roles.enums'
import { IUser } from '../interfaces/user.interface'
import { useAuthService } from '../services/auth.service'
import { useRequestService } from '../../client-requests/services/request.service'
import {
  IUserState,
  USER_APPROVED_STATES,
} from '../../shared/store/interfaces/auth/auth.interface'

export const useAuthFacade = () => {
  const authService = useAuthService()
  const requestService = useRequestService()

  const registerUser = async (
    registerFb: IRegisterFirebase,
  ): Promise<{
    ok: boolean
    user: IUser
  }> => {
    let newUserInstance: User | null = null
    let extraUserId: string | null = null

    try {
      const { user: newUser } =
        await authService.createUser({
          email: registerFb.email,
          password: registerFb.password,
        })

      newUserInstance = newUser
      const photoUrl = await authService.uploadUserImage(
        registerFb.photo.blob,
        newUserInstance.uid,
      )

      await authService.updateUserProfile(
        registerFb.displayName,
        photoUrl,
      )

      const { id } = await authService.createUserExtra({
        role: UserRoles.CLIENT,
        uid: newUserInstance.uid,
        accepted: false,
      })
      extraUserId = id

      await requestService.createAccessRequest({
        uid: newUserInstance.uid,
        email: newUserInstance.email as string,
        displayName: newUserInstance.displayName as string,
      })

      return {
        ok: true,
        user: {
          email: newUserInstance.email as string,
          uid: newUserInstance.uid,
          displayName:
            newUserInstance.displayName as string,
          photoUrl,
          role: UserRoles.CLIENT,
        },
      }
    } catch (err) {
      if (newUserInstance) {
        await Promise.all([
          authService.deleteFirebaseUser(newUserInstance),
          authService.removeUserImage(newUserInstance.uid),
        ])
      }

      if (extraUserId) {
        await authService.deleteUserExtra(extraUserId)
      }

      throw err
    }
  }

  const getExtraUser = async (
    agreement: string,
    user: User,
  ) => {
    const extraUser = await authService.getExtraUser(
      user.uid,
    )

    if (extraUser) {
      return {
        uid: extraUser.uid,
        email: user.email as string,
        displayName: user.displayName as string,
        photoUrl: user.photoURL as string,
        role: extraUser.role,
        agreement,
        userState: extraUser.accepted
          ? USER_APPROVED_STATES.APPROVED
          : USER_APPROVED_STATES.PENDING,
      }
    }

    throw new FirebaseError(
      'custom-error',
      'invalid agreement',
    )
  }

  const signInWithEmailAndPassword = async (
    credentials: { email: string; password: string },
    agreement: string,
  ): Promise<IUserState> => {
    const { user } = await authService.signIn(
      credentials.email,
      credentials.password,
    )

    return getExtraUser(agreement, user)
  }

  return {
    registerUser,
    signInWithEmailAndPassword,
    logOut: authService.logOut,
    getExtraUser,
  }
}
