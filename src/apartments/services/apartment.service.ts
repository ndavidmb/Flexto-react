import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'
import { Apartment } from '../interfaces/apartment.interface'

export const getApartments = async (): Promise<
  Apartment[]
> => {
  const apartmentsRef = collection(db, 'apartments')
  const q = query(
    apartmentsRef,
    orderBy('tower'),
    limit(10),
  )
  const apartmentSnapshot = await getDocs(q)
  const apartmentsList = apartmentSnapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    }),
  )
  return apartmentsList as Apartment[]
}

export const addApartment = async (
  apartment: Apartment,
) => {
  const docRef = await addDoc(
    collection(db, 'apartments'),
    apartment,
  )
  return docRef
}

export const deleteApartment = async (id: string) => {
  await deleteDoc(doc(db, `apartments/${id}`))
}

export const updateApartment = async (
  id: string,
  apartment: Apartment,
) => {
  const ref = doc(db, `apartments/${id}`)

  await updateDoc(ref, { ...apartment })
}

export const getPaginateApartments = async (
  limitPage: number,
  q = query(
    collection(db, 'apartments'),
    orderBy('tower'),
    limit(limitPage),
  ),
  search = '',
) => {
  const documentSnapshots = await getDocs(q)

  const lastVisible =
    documentSnapshots.docs[
      documentSnapshots.docs.length - 1
    ]

  const firstVisible = documentSnapshots.docs[0]

  const next = query(
    collection(db, 'apartments'),
    orderBy('tower'),
    startAfter(lastVisible),
    limit(limitPage),
  )

  const previous = query(
    collection(db, 'apartments'),
    orderBy('tower'),
    endBefore(firstVisible),
    limit(limitPage),
  )

  const apartmentsList = documentSnapshots.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    }),
  )

  return {
    next,
    apartments: apartmentsList as Apartment[],
    previous,
    totalPages: documentSnapshots.size / limitPage,
  }
}
