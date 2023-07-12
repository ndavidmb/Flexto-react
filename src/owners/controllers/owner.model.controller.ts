import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { useApartmentRepository } from '../../apartments/repositories/apartment.repository'
import { useBookingRepository } from '../../booking/repositories/booking.repository'
import { useAppSelector } from '../../shared/store/hooks'
import { Owner } from '../interfaces/owner.interface'
import { OwnerView } from '../interfaces/owner.view.interface'
import { useOwnerRepository } from '../repositories/owner.repository'

export const useOwnerModelController = () => {
  const ownerRepository = useOwnerRepository()
  const apartmentRepository = useApartmentRepository()
  const bookingRepository = useBookingRepository()

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
  ): Promise<OwnerView> => {
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

  return { getOwners, getOwnerDetail }
}
