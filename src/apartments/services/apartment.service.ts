import { FirestoreTable } from '../../shared/constants/firestore-tables';
import { useFirestore } from '../../shared/hooks/useFirestore';
import { Apartment } from '../interfaces/apartment.interface';

export function useApartmentService() {
  const firestore = useFirestore<Apartment>(FirestoreTable.APARTMENTS);

  const addApartment = async (apartment: Apartment) => {
    const docRef = await firestore.addFirestore(apartment)
    return docRef
  }

  const deleteApartment = async (id: string) => {
    await firestore.deleteFirestore(id)
  }

  const updateApartment = async (
    id: string,
    apartment: Apartment,
  ) => {
    return await firestore.updateFirestore(id, apartment)
  }

  const getApartments = async () => {
    const apartments = await firestore.getAllFirestore()

    // Consejo para debug
    // console.log(apartments)

    // Esta parte solo aplica para apartamentos
    apartments.sort((a, b) =>
      a.tower.localeCompare(b.tower),
    )

    return apartments
  }

  return {
    addApartment,
    deleteApartment,
    updateApartment,
    getApartments,
  }
}
