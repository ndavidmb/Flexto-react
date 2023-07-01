import { FirebaseError } from 'firebase/app'
import { User } from 'firebase/auth'
import { useRequestModelController } from '../../client-requests/controllers/request.model.controller'
import {
  IUserState,
  USER_APPROVED_STATES,
} from '../../shared/store/interfaces/auth/auth.interface'
import { IRegisterFirebase } from '../interfaces/register-form.interface'
import { UserRoles } from '../interfaces/user-roles.enums'
import { IUser } from '../interfaces/user.interface'
import { useAuthRepository } from '../repositories/auth.repository'
import { useRequestRepository } from '../../client-requests/repositories/request.repository'
import { RequestType } from '../../client-requests/interfaces/client-request.interface'
import { useAuthQueryController } from './auth.query.controller'
import { RegisterError } from '../errors/register.error'

export const useAuthModelController = () => {
  const authRepository = useAuthRepository()
  const requestRepository = useRequestRepository()
  const authQueryController = useAuthQueryController()

  const registerUser = async (
    registerFb: IRegisterFirebase,
  ): Promise<{
    ok: boolean
    user: IUser
  }> => {
    try {
      const { newUserInstance, photoUrl } =
        await authQueryController.createUser(registerFb)

      await requestRepository.createRequest({
        requestType: RequestType.ACCESS,
        uid: newUserInstance.uid,
        email: newUserInstance.email as string,
        displayName: newUserInstance.displayName as string,
        description: registerFb.requestDescription,
        phoneNumber: registerFb.phoneNumber,
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
      if (err instanceof RegisterError) {
        authQueryController.deleteUser(err.fallbackData)
      }

      throw err
    }
  }

  const getExtraUser = async (
    agreement: string,
    user: User,
  ) => {
    const extraUser = await authRepository.getExtraUser(
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
    const { user } = await authRepository.signIn(
      credentials.email,
      credentials.password,
    )

    return getExtraUser(agreement, user)
  }

  return {
    registerUser,
    signInWithEmailAndPassword,
    logOut: authRepository.logOut,
    getExtraUser,
  }
}
