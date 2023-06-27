import { User } from 'firebase/auth'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { UserRoles } from '../interfaces/user-roles.enums'
import { IUser } from '../interfaces/user.interface'
import { useAuthService } from '../services/auth.service'

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

  return {
    registerUser,
    logOut: authService.logOut,
    signIn: authService.signIn,
    getExtraUser: authService.getExtraUser
  }
}
