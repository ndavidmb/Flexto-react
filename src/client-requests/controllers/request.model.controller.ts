import { useApartmentModelController } from '../../apartments/controllers/apartment.model.controller'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { IUserRequest } from '../../auth/interfaces/user.interface'
import { useBookingModelController } from '../../booking/controllers/booking.model.controller'
import { BookingDTO } from '../../booking/interfaces/booking.interface'
import { OwnerDTO } from '../../owners/interfaces/owner.interface'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { DAYS_DICT } from '../../public-spaces/constants/days'
import { usePublicSpacesModelController } from '../../public-spaces/controllers/public-spaces.model.controller'
import { ValidateError } from '../../shared/errors/validate-error'
import { useAppSelector } from '../../shared/store/hooks'
import { getFormattedDate } from '../../shared/utils/formattedDate'
import {
  ClientRequestRecord,
  RequestType,
} from '../interfaces/client-request.interface'
import { RequestPublicSpaceDTO } from '../interfaces/request-public-space.interface'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { useRequestRepository } from '../repositories/request.repository'

export const useRequestModelController = () => {
  const requestRepository = useRequestRepository()
  const ownerRepository = useOwnerRepository()
  const publicSpaceController =
    usePublicSpacesModelController()
  const apartmentController = useApartmentModelController()
  const bookingController = useBookingModelController()

  const userState = useAppSelector(
    (state) => state.authState,
  )
  const getAdminRequest = async () => {
    const requests =
      await requestRepository.getAdminRequest()

    requests.sort(
      (a, b) =>
        new Date(b.createdAt!).getTime() -
        new Date(a.createdAt!).getTime(),
    )

    return requests
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
      foreignId: '',
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
      console.log(owner);

      await Promise.all([
        ownerRepository.updateOwner(owner.id!, {
          ...owner,
          apartmentId: apartment.id!,
        }),
        apartmentController.updateApartment({
          ...apartment,
          owner: request.user.uid,
          id: apartment.id!,
        }),
        changeRequestState(RequestStates.ACCEPTED, request),
        ownerRepository.activateOwnerAccount(
          owner.id!,
          owner,
        ),
      ])
    } catch (err) {
      console.log(err)
      // Restore to initial if fails
      if (owner) {
        await ownerRepository.updateOwner(owner.id!, {
          ...owner,
          apartmentId: '',
        })
      }

      await apartmentController.updateApartment({
        ...apartment,
        id: apartment.id!,
        owner: '',
      })
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
    console.log(request.space.id);
    const [owner, publicSpace] = await Promise.all([
      ownerRepository.getOwnerByUid(userState.uid),
      publicSpaceController.getPublicSpaceById(
        request.space.id!,
      ),
    ])

    const requestedDay = new Date(request.date).getDay() + 1

    if (!publicSpace.schedule.days.includes(requestedDay)) {
      throw new ValidateError(
        'Días disponibles: ' +
          publicSpace.schedule.days.map(
            (d) => `${DAYS_DICT[d]}`,
          ),
      )
    }

    await requestRepository.createRequest({
      description: `Solicitud de reserva: "${request.space.name}"`,
      endHour: request.endHour,
      startHour: request.startHour,
      requestType: RequestType.PUBLIC_SPACE,
      displayName: userState.displayName,
      uid: userState.uid,
      email: userState.email,
      phoneNumber: owner.phoneNumber,
      date: request.date,
      foreignId: request.space.id!,
    })
  }
  const createActRequest = async (
    request: ClientRequestRecord,
  ) => {
    const { phoneNumber } =
      await ownerRepository.getOwnerByUid(userState.uid)
    await requestRepository.createRequest({
      description: request.recordDetail,
      requestType: RequestType.ACT,
      displayName: userState.displayName,
      uid: userState.uid,
      email: userState.email,
      phoneNumber,
      date: request.date,
      foreignId:''
    })
  }

  const acceptPublicSpaceRequest = async (
    request: AdminRequest,
  ) => {
    try {
      const publicSpace =
        await publicSpaceController.getPublicSpaceById(
          request.foreignId!,
        )

      const booking: BookingDTO = {
        date: request.dateDetail.date,
        startHour: Number(request.dateDetail.startHour),
        endHour: Number(request.dateDetail.endHour),
        owner: request.user,
        publicSpace: {
          name: publicSpace.name,
          id: publicSpace.id,
        },
        createAt: new Date().toUTCString(),
      }

      await Promise.all([
        bookingController.addBooking(booking),
        changeRequestState(RequestStates.ACCEPTED, request),
      ])
    } catch (err) {
      console.error(err)
      throw err
    }
  }
  const acceptActRequest = async (
    request: AdminRequest,
    ids:string[]
  ) => {
    let owner: OwnerDTO | null = null
    try {
      if (request.user.uid !== undefined) {
        owner = await ownerRepository.getOwnerByUid(
          request.user.uid,
        )
      }
      else{
       throw new Error("ID is undefined");
      }
      await Promise.all([
        ownerRepository.updateActOwner(owner.id!, {
          ...owner,
          actsAccess: ids,
        }),
        changeRequestState(RequestStates.ACCEPTED, request),
      ])
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const updateAllUsers = async (user: IUserRequest) => {
    const ownerRequests =
      await requestRepository.getOwnerRequests(user.uid)

    const requestPromises = ownerRequests.map((req) =>
      requestRepository.updateOwner(req, user),
    )

    await Promise.all(requestPromises)
  }

  return {
    getAdminRequest,
    changeRequestState,
    deleteRequest,
    createAccessRequest,
    createPublicSpaceRequest,
    acceptAccessRequest,
    acceptPublicSpaceRequest,
    getOwnerRequest,
    createActRequest,
    updateAllUsers,
    acceptActRequest
  }
}
