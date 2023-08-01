import { where } from 'firebase/firestore/lite'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { Apartment } from '../interfaces/apartment.interface'

export const useApartmentRepository = () => {
  const firestore = useFirestore<Apartment>(
    FirestoreTable.APARTMENTS,
  )

  const getApartments = async () => {
    return await firestore.getAllFirestore()
  }

  const addApartment = async (apartment: Apartment) => {
    return await firestore.addFirestore(apartment)
  }

  const deleteApartment = async (id: string) => {
    return await firestore.deleteFirestore(id)
  }

  const updateApartment = async (
    id: string,
    apartment: Apartment,
  ) => {
    return await firestore.updateFirestore(id, apartment)
  }

  const getAvailableApartments = async () => {
    return await firestore.getAllFirestore([
      where('owner', '==', ''),
    ])
  }

  const getApartmentByOwner = async (uid: string) => {
    const [apartment] = await firestore.getByParam(
      'owner',
      uid,
    )
    return apartment
  }

  const getApartmentById = async (id: string) => {
    return await firestore.getById(id)
  }

  const getApartmentRef = (id: string) => {
    return firestore.getDocRef(id)
  }

  return {
    getApartments,
    getApartmentByOwner,
    getApartmentById,
    addApartment,
    deleteApartment,
    updateApartment,
    getAvailableApartments,
    getApartmentRef,
  }
}
