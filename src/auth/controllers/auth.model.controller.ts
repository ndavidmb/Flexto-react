import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
import { RequestType } from '../../client-requests/interfaces/client-request.interface'
import { useRequestRepository } from '../../client-requests/repositories/request.repository'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { ValidateError } from '../../shared/errors/validate-error'
import {
  IUserState,
  USER_APPROVED_STATES,
} from '../../shared/store/interfaces/auth/auth.interface'
import { getFormattedDate } from '../../shared/utils/formattedDate'
import { RegisterError } from '../errors/register.error'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { UserRoles } from '../interfaces/user-roles.enums'
import { IUser } from '../interfaces/user.interface'
import { useAuthRepository } from '../repositories/auth.repository'
import { useOwnerModelController } from '../../owners/controllers/owner.model.controller'

export const useAuthModelController = () => {
  const authRepository = useAuthRepository()
  const ownerRepository = useOwnerRepository()
  const ownerModelController = useOwnerModelController()
  const requestRepository = useRequestRepository()

  const registerUser = async (
    registerFb: IRegisterFirebase,
  ): Promise<{
    ok: boolean
    user: IUser
  }> => {
    let extraUserId: string | null = null
    try {
      const { newUserInstance, photoUrl } =
        await authRepository.createCompleteUser(registerFb)

      await ownerRepository.createOwner({
        role: UserRoles.CLIENT,
        uid: newUserInstance.uid,
        accepted: false,
        phoneNumber: registerFb.phoneNumber.toString(),
        apartmentId: '',
        displayName: newUserInstance.displayName as string,
        email: newUserInstance.email as string,
        photoUrl: newUserInstance.photoURL as string,
        deleted: false,
        // esteban
      })

      const { id } = await requestRepository.createRequest({
        requestType: RequestType.ACCESS,
        uid: newUserInstance.uid,
        email: newUserInstance.email as string,
        displayName: newUserInstance.displayName as string,
        description: registerFb.requestDescription,
        phoneNumber: registerFb.phoneNumber,
        date: getFormattedDate(new Date()),
        foreignId: '',
      })

      extraUserId = id
      return {
        ok: true,
        user: {
          email: newUserInstance.email as string,
          uid: newUserInstance.uid,
          displayName:
            newUserInstance.displayName as string,
          photoUrl: photoUrl ?? '',
          role: UserRoles.CLIENT,
        },
      }
    } catch (err) {
      if (err instanceof RegisterError) {
        authRepository.deleteAppUser(err.fallbackData)
        if (extraUserId) {
          ownerRepository.deleteOwner(extraUserId)
        }
      }

      throw err
    }
  }

  const getExtraUser = async (
    agreement: string,
    user: User,
  ) => {
    const extraUser = await ownerRepository.getOwnerByUid(
      user.uid,
    )
    if (extraUser) {
      return {
        ...extraUser,
        uid: extraUser.uid,
        email: user.email as string,
        displayName: user.displayName as string,
        photoUrl: user.photoURL as string,
        role: extraUser.role,
        deleted: extraUser.deleted,
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
    const { user } = await authRepository.signIn(
      credentials.email,
      credentials.password,
    )

    const extraUser = await getExtraUser(agreement, user)

    if (extraUser.deleted) {
      await deleteUser(extraUser.id!, user)
      throw new ValidateError('user_deleted')
    }

    return extraUser
  }

  const sendRecoveryPasswordEmail = async (
    email: string,
  ) => {
    const owner = await ownerRepository.getOwnerByEmail(
      email,
    )

    if (!owner) {
      throw new ValidateError('El usuario no existe')
    }

    return await authRepository.changePasswordEmail(email)
  }

  const deleteUser = async (
    ownerId: string,
    user: User,
  ) => {
    await Promise.all([
      authRepository.deleteAppUser({
        newUserInstance: user,
      }),
      ownerModelController.deleteUserTotally(ownerId),
    ])
  }

  return {
    registerUser,
    signInWithEmailAndPassword,
    logOut: authRepository.logOut,
    getExtraUser,
    sendRecoveryPasswordEmail,
    deleteUser,
  }
}
