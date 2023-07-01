import { User } from 'firebase/auth'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { useAuthRepository } from '../repositories/auth.repository'
import { UserRoles } from '../interfaces/user-roles.enums'
import { RegisterError } from '../errors/register.error'
import { RegisterFallback } from '../interfaces/register-fallback.interface'

export const useAuthQueryController = () => {
  const authRepository = useAuthRepository()

  const createUser = async (
    registerFb: IRegisterFirebase,
  ) => {
    let newUserInstance: User | null = null
    let extraUserId: string | null = null

    try {
      const { user: newUser } =
        await authRepository.createUser({
          email: registerFb.email,
          password: registerFb.password,
        })

      newUserInstance = newUser
      const photoUrl = await authRepository.uploadUserImage(
        registerFb.photo.blob,
        newUserInstance.uid,
      )

      await authRepository.updateUserProfile(
        registerFb.displayName,
        photoUrl,
      )

      const { id } = await authRepository.createUserExtra({
        role: UserRoles.CLIENT,
        uid: newUserInstance.uid,
        accepted: false,
        phoneNumber: registerFb.phoneNumber.toString(),
        apartmentId: '',
      })
      extraUserId = id

      return { extraUserId, newUserInstance, photoUrl }
    } catch (err) {
      throw new RegisterError(
        'Error al crear el registro',
        { extraUserId, newUserInstance },
      )
    }
  }

  const deleteUser = async ({
    newUserInstance,
    extraUserId,
  }: RegisterFallback) => {
    if (newUserInstance) {
      await Promise.all([
        authRepository.deleteFirebaseUser(newUserInstance),
        authRepository.removeUserImage(newUserInstance.uid),
      ])
    }

    if (extraUserId) {
      await authRepository.deleteUserExtra(extraUserId)
    }
  }

  const activateUserAccount = async (uid: string) => {
    const extraUser = await authRepository.getExtraUser(uid)
    await authRepository.updateExtraUser(extraUser.id!, {
      ...extraUser,
      accepted: true,
    })
  }

  return { createUser, deleteUser, activateUserAccount }
}
