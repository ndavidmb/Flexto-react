import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { IUser } from '../interfaces/user.interface'
import { AuthModel } from '../models/auth.model'

export function AuthController(agreement: string) {
  const signIn = async (credentials: {
    email: string
    password: string
  }) => {
    const authModel = new AuthModel(
      credentials.email,
      credentials.password,
    )
    await authModel.signIn()
    return {
      ok: true,
      ...authModel.getUser(),
    }
  }

  const logOut = async () => {
    return await AuthModel.logOut()
  }

  // TODO: Add Loading
  const register = async (
    registerFb: IRegisterFirebase,
  ): Promise<{
    ok: boolean
    user: IUser
  }> => {
    const authModel = new AuthModel(
      registerFb.email,
      registerFb.password,
    )

    let savedUser: User | null = null
    let extraUserId: string | null = null

    try {
      const { user } = await authModel.createUser()
      savedUser = user

      const photo = await authModel.uploadUserImage(
        registerFb.photo.blob,
        user.uid,
      )

      await authModel.updateProfile(
        registerFb.displayName,
        photo,
      )

      const { id } = await authModel.createUserExtra({
        agreement,
        uid: user.uid,
        role: 'client',
      })

      extraUserId = id

      return {
        ok: true,
        user: {
          ...authModel.getUser(),
          uid: user.uid,
          displayName: registerFb.displayName,
          photoUrl: photo,
        },
      }
    } catch (err) {
      if (savedUser) {
        await Promise.all([
          authModel.deleteFirebaseUser(savedUser),
          authModel.removeUserImage(savedUser.uid),
        ])
      }

      if (extraUserId) {
        await authModel.deleteUserExtra(extraUserId)
      }

      console.error(err)
      throw err
    }
  }

  return { signIn, logOut, register }
}

// TODO: Alert to show firebase errors
export const FirebaseErrorValidationConverter = (
  err: FirebaseError,
) => {
  return { code: err.code, message: err.message }
}
