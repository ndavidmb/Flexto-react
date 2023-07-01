import { useApartmentViewController } from '../../apartments/controllers/apartment.view.controller'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { OwnerDTO } from '../../owners/interfaces/owner.interface'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { RequestType } from '../interfaces/client-request.interface'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { useRequestRepository } from '../repositories/request.repository'

export const useRequestModelController = () => {
  const requestRepository = useRequestRepository()
  const ownerRepository = useOwnerRepository()
  const apartmentController = useApartmentViewController()

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
    let owner: OwnerDTO | null = null

    try {
      owner = await ownerRepository.getOwnerByUid(
        request.user.uid,
      )

      await Promise.all([
        ownerRepository.updateOwner(owner.id!, {
          ...owner,
          apartmentId: apartment.id!,
        }),
        apartmentController.updateApartment(apartment.id!, {
          ...apartment,
          owner: request.user.uid,
        }),
        changeRequestState(RequestStates.ACCEPTED, request),
        ownerRepository.activateOwnerAccount(
          owner.id!,
          owner,
        ),
      ])
    } catch (err) {
      // Restore to initial if fails
      if (owner) {
        await ownerRepository.updateOwner(owner.id!, {
          ...owner,
          apartmentId: '',
        })
      }

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
