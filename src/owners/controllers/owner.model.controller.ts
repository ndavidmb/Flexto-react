import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { useApartmentRepository } from '../../apartments/repositories/apartment.repository'
import { Owner } from '../interfaces/owner.interface'
import { useOwnerRepository } from '../repositories/owner.repository'

export const useOwnerModelController = () => {
  const ownerRepository = useOwnerRepository()
  const apartmentRepository = useApartmentRepository()

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

  const getOwnerStates = async (id: string) => {
    // TODO: Corregir uid
    return ownerRepository.getOwnerByUid(id)
  }

  return { getOwners }
}
