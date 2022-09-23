import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'
import { db } from '../../shared/services/firebase.service'
import { RootState } from '../../shared/store/store'
import { Apartment } from '../interfaces/apartment.interface'

export function ApartmentService() {
  const theme = useSelector(
    (state: RootState) => state.themeState.theme,
  )

  const addApartment = async (apartment: Apartment) => {
    const docRef = await addDoc(
      collection(db, 'apartments'),
      apartment,
    )
    return docRef
  }

  const deleteApartment = async (id: string) => {
    await deleteDoc(doc(db, `apartments/${id}`))
  }

  const updateApartment = async (
    id: string,
    apartment: Apartment,
  ) => {
    const ref = doc(db, `apartments/${id}`)

    await updateDoc(ref, { ...apartment })
  }

  const getPaginateApartments = async (
    limitPage: number,
    search = '',
  ) => {
    const q = query(
      collection(db, 'apartments'),
      where(
        'customization',
        '==',
        `customizations/${theme?.id}`,
      ),
    )

    const documentSnapshots = await getDocs(q)

    const apartmentsList = documentSnapshots.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Apartment),
      )
      .sort((a, b) => a.tower.localeCompare(b.tower))

    return {
      apartments: apartmentsList,
      totalPages: Math.ceil(
        documentSnapshots.size / limitPage,
      ),
    }
  }

 return {
    addApartment,
    deleteApartment,
    updateApartment,
    getPaginateApartments,
  }
}
