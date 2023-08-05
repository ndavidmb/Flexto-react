import {
  Owner,
  OwnerDTO,
} from '../../owners/interfaces/owner.interface'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { ApartmentWithOwner } from '../components/AparmentWithOwner'
import {
  Apartment,
  ApartmentExtraInfo,
} from '../interfaces/apartment.interface'
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
        const withoutOwner = {
          ...apartment,
          phone: '',
          email: '',
          name: '',
          hasOwner: false,
        }
        if (!apartment.owner) {
          return withoutOwner
        }

        const owner = owners.find(
          (o) => o.uid === apartment.owner,
        )

        if (!owner) {
          return withoutOwner
        }

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
    await apartmentRepository.deleteApartment(apartment.id!)
    let owner: OwnerDTO | null = null

    if (apartment.owner && apartment.owner !== '') {
      owner = await ownerRepository.getOwnerByUid(
        apartment.owner!,
      )
      await ownerRepository.updateOwner(owner.id!, {
        ...owner,
        apartmentId: '',
      })
    }
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

  const updateExtraInfo = (
    apartment: Apartment,
    extraInfo: ApartmentExtraInfo,
  ) => {
    return apartmentRepository.updateApartment(
      apartment.id!,
      {
        ...apartment,
        extraInfo: {
          ...extraInfo,
        },
      },
    )
  }

  const getApartmentByOwner = async (uid: string) => {
    const apartment =
      await apartmentRepository.getApartmentByOwner(uid)
    const owner = await ownerRepository.getOwnerByUid(uid)

    return {
      apartment,
      owner,
    }
  }

  return {
    getApartmentsWithOwners,
    getApartmentByOwner,
    addApartment,
    deleteApartment,
    updateApartment,
    getAvailableApartments,
    updateExtraInfo,
  }
}
