import { useApartmentController } from '../../apartments/controllers/apartment.controller'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { useAuthRepository } from '../../auth/repositories/auth.repository'
import { RequestType } from '../interfaces/client-request.interface'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { useRequestRepository } from '../repositories/request.repository'

export const useRequestModelController = () => {
  const requestRepository = useRequestRepository()
  const authRepository = useAuthRepository()
  const apartmentController = useApartmentController()

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

  const acceptAccessRequest = async (
    request: AdminRequest,
    apartment: Apartment,
  ) => {
    try {
      await authRepository.updateUserApartment(
        request.user.uid,
        apartment.id!,
      )

      await apartmentController.updateApartment(
        apartment.id!,
        {
          ...apartment,
          owner: request.user.uid,
        },
      )

      await changeRequestState(
        RequestStates.ACCEPTED,
        request,
      )

      await authRepository.activateUserAccount(
        request.user.uid,
      )
    } catch (err) {
      // Restore to initial if fails
      await authRepository.updateUserApartment(
        request.user.uid,
        '',
      )
      await apartmentController.updateApartment(
        apartment.id!,
        {
          ...apartment,
          owner: '',
        },
      )
      throw err
    }
  }

  return {
    getAdminRequest,
    changeRequestState,
    deleteRequest,
    createAccessRequest,
    acceptAccessRequest,
  }
}
