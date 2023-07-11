import { useApartmentViewController } from '../../apartments/controllers/apartment.view.controller'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { OwnerDTO } from '../../owners/interfaces/owner.interface'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { useAppSelector } from '../../shared/store/hooks'
import { getFormattedDate } from '../../shared/utils/formattedDate'
import { RequestType } from '../interfaces/client-request.interface'
import { RequestPublicSpaceDTO } from '../interfaces/request-public-space.interface'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { useRequestRepository } from '../repositories/request.repository'

export const useRequestModelController = () => {
  const requestRepository = useRequestRepository()
  const ownerRepository = useOwnerRepository()
  const apartmentController = useApartmentViewController()

  const userState = useAppSelector(
    (state) => state.authState,
  )

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
      date: getFormattedDate(new Date()),
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

  const getOwnerRequest = async (uid: string) => {
    try {
      return await requestRepository.getOwnerRequests(uid)
    } catch (err) {
      console.log(err)
      return []
    }
  }

  const createPublicSpaceRequest = async (
    request: RequestPublicSpaceDTO,
  ) => {
    const { phoneNumber } =
      await ownerRepository.getOwnerByUid(userState.uid)
    await requestRepository.createRequest({
      description: `Solicitud de reserva: "${request.space.name}"`,
      endHour: request.endHour,
      startHour: request.startHour,
      requestType: RequestType.PUBLIC_SPACE,
      displayName: userState.displayName,
      uid: userState.uid,
      email: userState.email,
      phoneNumber,
      date: request.date,
      foreignId: request.space.id!,
    })
  }

  return {
    getAdminRequest,
    changeRequestState,
    deleteRequest,
    createAccessRequest,
    createPublicSpaceRequest,
    acceptAccessRequest,
    getOwnerRequest,
  }
}
