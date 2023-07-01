import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { ApartmentWithOwner } from '../components/AparmentWithOwner'
import { Apartment } from '../interfaces/apartment.interface'
import { useApartmentRepository } from '../repositories/apartment.repository'

export const useApartmentModelController = () => {
  const apartmentRepository = useApartmentRepository()
  const ownerRepository = useOwnerRepository()

  const getApartmentsWithOwners = async (): Promise<
    ApartmentWithOwner[]
  > => {
    const [apartments, owners] = await Promise.all([
      apartmentRepository.getApartments(),
      ownerRepository.getAllOwners(),
    ])

    const apartmentsWithOwners = apartments.map(
      (apartment) => {
        if (!apartment.owner) {
          return {
            ...apartment,
            phone: '',
            email: '',
            name: '',
            hasOwner: false,
          }
        }

        const owner = owners.find(
          (o) => o.uid === apartment.owner,
        )

        return {
          ...apartment,
          phone: owner!.phoneNumber,
          email: owner!.email,
          name: owner!.displayName,
          hasOwner: true,
        }
      },
    )
    apartmentsWithOwners.sort((a, b) =>
      a.tower.localeCompare(b.tower),
    )
    return apartmentsWithOwners
  }

  const addApartment = async (apartment: Apartment) => {
    return await apartmentRepository.addApartment(apartment)
  }

  const deleteApartment = async (apartment: Apartment) => {
    const [owner] = await Promise.all([
      ownerRepository.getOwnerByUid(apartment.owner!),
      apartmentRepository.deleteApartment(apartment.id!),
    ])

    await ownerRepository.updateOwner(owner.id!, {
      ...owner,
      apartmentId: '',
    })
  }

  const updateApartment = async (apartment: Apartment) => {
    await apartmentRepository.updateApartment(
      apartment.id!,
      apartment,
    )
  }

  const getAvailableApartments = async () => {
    return await apartmentRepository.getAvailableApartments()
  }

  return {
    getApartmentsWithOwners,
    addApartment,
    deleteApartment,
    updateApartment,
    getAvailableApartments,
  }
}
