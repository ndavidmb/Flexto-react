import { User } from 'firebase/auth'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { useApartmentRepository } from '../../apartments/repositories/apartment.repository'
import { useEmail } from '../../auth/hooks/useEmail'
import { UserRoles } from '../../auth/interfaces/user-roles.enums'
import { IUserRequest } from '../../auth/interfaces/user.interface'
import { useAuthRepository } from '../../auth/repositories/auth.repository'
import { useBookingModelController } from '../../booking/controllers/booking.model.controller'
import { BookingWithId } from '../../booking/interfaces/booking.interface'
import { useBookingRepository } from '../../booking/repositories/booking.repository'
import { useRequestModelController } from '../../client-requests/controllers/request.model.controller'
import { usePaymentOwnerRepository } from '../../payments/repositories/payment-owner.repository'
import { OwnerUpdated } from '../../profiles/interfaces/profile.interface'
import { CloudStorageFolders } from '../../shared/constants/cloud-storage-folders.constants'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestoreBulk } from '../../shared/hooks/useFirestoreBulk'
import { useFirestoreDocs } from '../../shared/hooks/useFirestoreDocs'
import {
  useAppDispatch,
  useAppSelector,
} from '../../shared/store/hooks'
import { updateOwnerState } from '../../shared/store/slices/auth/authSlice'
import { generatePassword } from '../../shared/utils/generatePassword'
import {
  Owner,
  OwnerDTO,
} from '../interfaces/owner.interface'
import { OwnerViewWithBookings } from '../interfaces/owner.view.interface'
import { useOwnerRepository } from '../repositories/owner.repository'
import { useParams } from 'react-router-dom'

export const useOwnerModelController = () => {
  const ownerRepository = useOwnerRepository()
  const apartmentRepository = useApartmentRepository()
  const bookingRepository = useBookingRepository()
  const requestModelController = useRequestModelController()
  const bookingModelController = useBookingModelController()
  const paymentOwnerRepository = usePaymentOwnerRepository()
  const authRepository = useAuthRepository()
  const firestoreDocs = useFirestoreDocs()

  const {
    getBatch,
    commitBatch,
    bulkDelete: bulkDeleteBookings,
  } = useFirestoreBulk<BookingWithId>(
    FirestoreTable.BOOKING,
  )

  const email = useEmail()
  const { id } = useParams()

  const dispatch = useAppDispatch()

  const getOwners = async (): Promise<Owner[]> => {
    const [owners, apartments] = await Promise.all([
      ownerRepository.getActiveOwners(),
      apartmentRepository.getApartments(),
    ])
    return owners.map((owner) => {
      const apartment = apartments.find(
        (apartment) => apartment.owner === owner.uid,
      ) as Apartment

      return {
        apartment,
        email: owner.email,
        name: owner.displayName,
        phone: owner.phoneNumber,
        id: owner.id,
      }
    })
  }

  const getOwnerDetailBooking = async (
    ownerId: string,
  ): Promise<OwnerViewWithBookings> => {
    const owner = await ownerRepository.getOwnerByUid(
      ownerId,
    )

    const [apartment, bookings] = await Promise.all([
      apartmentRepository.getApartmentByOwner(owner.uid),
      bookingRepository.getBookingsByOwner(owner.uid),
    ])

    return {
      owner,
      apartment,
      bookings,
    }
  }

  const getOwnerDetailUid = async (uid: string) => {
    const [owner, apartment] = await Promise.all([
      ownerRepository.getOwnerByUid(uid),
      apartmentRepository.getApartmentByOwner(uid),
    ])

    return {
      owner,
      apartment,
    }
  }

  const updateOwner = async (
    updatedData: OwnerUpdated,
    oldOwner: OwnerDTO,
  ) => {
    const user = authRepository.getCurrentUser()
    if (!user) {
      return
    }

    let newPhotoUrl: null | string = null
    if (updatedData.name && updatedData.blob) {
      const [, photoUrl] = await Promise.all([
        firestoreDocs.deleteFile(
          oldOwner.uid,
          CloudStorageFolders.PICTURES,
        ),
        firestoreDocs.uploadFile({
          file: updatedData.blob,
          filename: oldOwner.uid,
          filepath: CloudStorageFolders.PICTURES,
        }),
      ])
      newPhotoUrl = photoUrl
    }

    const newData = {
      displayName: updatedData.displayName,
      phoneNumber: updatedData.phoneNumber,
    }

    const owner: IUserRequest = {
      ...newData,
      email: oldOwner.email,
      uid: oldOwner.uid,
    }

    const photoUrl = newPhotoUrl ?? user.photoURL

    const toUpdatePromises = [
      authRepository.updateUserProfile(
        user,
        newData.displayName,
        photoUrl ?? undefined,
      ),
      ownerRepository.updateOwner(oldOwner.id!, {
        ...oldOwner,
        ...newData,
        photoUrl,
      }),
      requestModelController.updateAllUsers(owner),
      bookingModelController.updateAllOwners(owner),
    ]

    await Promise.all(toUpdatePromises)

    dispatch(
      updateOwnerState({
        displayName: newData.displayName,
        photoUrl,
      }),
    )
  }

  const createOwner = async (owner: Owner) => {
    const temporalPassword = generatePassword()
    const { newUserInstance } =
      await authRepository.createCompleteUser({
        displayName: owner.name,
        email: owner.email,
        phoneNumber: owner.phone,
        requestDescription: '',
        password: temporalPassword,
        photo: null,
        role: UserRoles.CLIENT,
      })

    Promise.all([
      apartmentRepository.updateApartment(
        owner.apartment.id!,
        { ...owner.apartment, owner: newUserInstance.uid },
      ),
    ])

    await ownerRepository.createOwner({
      role: UserRoles.CLIENT,
      uid: newUserInstance.uid,
      accepted: true,
      phoneNumber: owner.phone.toString(),
      apartmentId: owner.apartment.id!,
      displayName: newUserInstance.displayName as string,
      email: newUserInstance.email as string,
      photoUrl: newUserInstance.photoURL as string,
      deleted: false,
    })

    await email.sendEmail({
      email: owner.email,
      subject: 'Se acaba de crear un usuario en FlexTo',
      body: `<h1>¡Hola! Bienvenido a FlexTo ${newUserInstance.displayName}</h1>
      <br />
      <p>
      Se te acaba de asignar un usuario a este correo electrónico con la contraseña temporal, ingresa a la página para poder cambiarla <br/>
      <b>Contraseña: ${temporalPassword}</b>
      <br/>
      <br/>
      Gracias por su atención.
      <br/>
      <br/>
      Equipo FlexTo. S.A.S
      </p>
      <p>Si no solicito ningún usuario haga caso omiso a este mensaje.</p>`,
    })
  }

  const getOwnerById = (ownerId: string) => {
    return ownerRepository.getOwnerById(ownerId)
  }

  const deleteTemporallyUser = async (ownerId: string) => {
    const owner = await ownerRepository.getOwnerById(
      ownerId,
    )
    await ownerRepository.deleteTemporallyUser(owner)
  }

  const deleteUserTotally = async (ownerId: string) => {
    const owner = await ownerRepository.getOwnerById(
      ownerId,
    )

    const [apartment, bookings, ownerPayments] =
      await Promise.all([
        apartmentRepository.getApartmentByOwner(owner.uid),
        bookingRepository.getBookingsByOwner(
          owner.uid,
        ) as Promise<BookingWithId[]>,
        paymentOwnerRepository.getPaymentByOwner(owner.id!),
        ownerRepository.deleteOwner(owner.id!),
      ])

    const apartmentRef =
      apartmentRepository.getApartmentRef(apartment.id!)
    const ownerPaymentRef =
      paymentOwnerRepository.getPaymentOwnerRef(
        ownerPayments.id,
      )

    const batch = getBatch()
    bulkDeleteBookings(batch, bookings)

    batch.set(apartmentRef, {
      ...apartment,
      owner: '',
      customization: `customizations/${id}`,
    })

    batch.delete(ownerPaymentRef)
    commitBatch(batch)
  }

  return {
    getOwners,
    getOwnerById,
    getOwnerDetailBooking,
    getOwnerDetailUid,
    updateOwner,
    createOwner,
    deleteTemporallyUser,
    deleteUserTotally,
  }
}
