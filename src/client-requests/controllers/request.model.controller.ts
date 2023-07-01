import { useAuthModelController } from '../../auth/controllers/auth.model.controller'
import { useAuthQueryController } from '../../auth/controllers/auth.query.controller'
import { useAuthRepository } from '../../auth/repositories/auth.repository'
import { RequestType } from '../interfaces/client-request.interface'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { useRequestRepository } from '../repositories/request.repository'

export const useRequestModelController = () => {
  const requestRepository = useRequestRepository()
  const authQueryController = useAuthQueryController()

  const getAdminRequest = async () => {
    return await requestRepository.getAdminRequest()
  }

  const deleteRequest = async (id: string) => {
    await requestRepository.deleteRequest(id)
  }

  const changeRequestState = async (
    newState: RequestStates,
    request: AdminRequest,
  ) => {
    try {
      await requestRepository.changeRequestState(
        newState,
        request,
      )

      if (
        request.type === RequestType.ACCESS &&
        newState === RequestStates.ACCEPTED
      ) {
        await authQueryController.activateUserAccount(
          request.user.uid,
        )
      }
    } catch (err) {
      await requestRepository.changeRequestState(
        RequestStates.PENDING,
        request,
      )
      throw err
    }
  }

  const createAccessRequest = async (accessRequest: {
    uid: string
    email: string
    displayName: string
    description: string
    phoneNumber: string
  }) => {
    await requestRepository.createRequest({
      requestType: RequestType.ACCESS,
      uid: accessRequest.uid,
      email: accessRequest.email,
      displayName: accessRequest.displayName,
      description: accessRequest.description,
      phoneNumber: accessRequest.phoneNumber,
    })
  }

  return {
    getAdminRequest,
    changeRequestState,
    deleteRequest,
    createAccessRequest,
  }
}
