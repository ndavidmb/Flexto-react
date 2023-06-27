import { User } from 'firebase/auth'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { UserRoles } from '../interfaces/user-roles.enums'
import { IUser } from '../interfaces/user.interface'
import { useAuthService } from '../services/auth.service'
import { FirebaseError } from 'firebase/app'

export const useAuthFacade = () => {
  const authService = useAuthService()

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
      })
      extraUserId = id

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

  const signIn = async (
    credentials: { email: string; password: string },
    agreement: string,
  ) => {
    const { user } = await authService.signIn(
      credentials.email,
      credentials.password,
    )

    const extraUser = await authService.getExtraUser(user.uid)

    if (extraUser) {
      return {
        ok: true,
        agreement,
        uid: extraUser.uid,
        role: extraUser.role,
        email: user.email as string,
        displayName: user.displayName as string,
        photoUrl: user.photoURL as string,
      }
    }
    authService.logOut()
    throw new FirebaseError(
      'custom-error',
      'invalid agreement',
    )
  }

  return {
    registerUser,
    signIn,
    logOut: authService.logOut,
    getExtraUser: authService.getExtraUser,
  }
}
