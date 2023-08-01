import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { useApartmentRepository } from '../../apartments/repositories/apartment.repository'
import { IUserRequest } from '../../auth/interfaces/user.interface'
import { useAuthRepository } from '../../auth/repositories/auth.repository'
import { useBookingModelController } from '../../booking/controllers/booking.model.controller'
import { useBookingRepository } from '../../booking/repositories/booking.repository'
import { useRequestModelController } from '../../client-requests/controllers/request.model.controller'
import { OwnerUpdated } from '../../profiles/interfaces/profile.interface'
import { CloudStorageFolders } from '../../shared/constants/cloud-storage-folders.constants'
import { useFirestoreDocs } from '../../shared/hooks/useFirestoreDocs'
import { useAppDispatch } from '../../shared/store/hooks'
import { updateOwnerState } from '../../shared/store/slices/auth/authSlice'
import {
  Owner,
  OwnerDTO,
} from '../interfaces/owner.interface'
import { OwnerViewWithBookings } from '../interfaces/owner.view.interface'
import { useOwnerRepository } from '../repositories/owner.repository'

export const useOwnerModelController = () => {
  const ownerRepository = useOwnerRepository()
  const apartmentRepository = useApartmentRepository()
  const bookingRepository = useBookingRepository()
  const requestModelController = useRequestModelController()
  const bookingModelController = useBookingModelController()
  const authRepository = useAuthRepository()
  const firestoreDocs = useFirestoreDocs()

  const dispatch = useAppDispatch()

  const getOwners = async (): Promise<Owner[]> => {
    const [owners, apartments] = await Promise.all([
      ownerRepository.getAllOwners(),
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

  const getOwnerDetail = async (
    ownerId: string,
  ): Promise<OwnerViewWithBookings> => {
    const owner = await ownerRepository.getOwnerById(
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
      bookingRepository.getBookingsByOwner(uid),
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
    let newPhotoUrl: null | string = null
    if (updatedData.name) {
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

    const photoUrl = newPhotoUrl ?? oldOwner.photoUrl

    await Promise.all([
      ownerRepository.updateOwner(oldOwner.id!, {
        ...oldOwner,
        ...newData,
        photoUrl,
      }),
      requestModelController.updateAllUsers(owner),
      bookingModelController.updateAllOwners(owner),
      authRepository.updateUserProfile(
        newData.displayName,
        photoUrl,
      ),
    ])

    dispatch(
      updateOwnerState({
        displayName: newData.displayName,
        photoUrl,
      }),
    )
  }

  return {
    getOwners,
    getOwnerDetail,
    getOwnerDetailUid,
    updateOwner,
  }
}
