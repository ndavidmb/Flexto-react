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

  return { getApartments }
}
