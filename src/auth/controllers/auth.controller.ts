import { FirebaseError } from 'firebase/app'
import { useAuthFacade } from '../facades/auth.facade'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { IUser } from '../interfaces/user.interface'

export function useAuthController(agreement?: string) {
  const authFacade = useAuthFacade()

  const signIn = async (credentials: {
    email: string
    password: string
  }) => {
    const { user } = await authFacade.signIn(
      credentials.email,
      credentials.password,
    )
    const extraUser = await authFacade.getExtraUser()

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
    authFacade.logOut()
    throw new FirebaseError(
      'custom-error',
      'invalid agreement',
    )
  }

  const logOut = async () => {
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
