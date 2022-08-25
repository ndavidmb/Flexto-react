import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endBefore, getDocs,
  limit,
  orderBy,
  query, updateDoc
} from 'firebase/firestore/lite'
import { getApartmentsByRef } from '../../apartments/services/apartment.service'
import { db } from '../../shared/services/firebase.service'
import { Owner } from '../interfaces/owner.interface'

export const getOwner = async (): Promise<
  Owner[]
  > => {
  const ownerRef = collection(db, 'owner')
  const q = query(
    ownerRef,
    orderBy('name'),
    limit(10),
  )
  const ownerSnapshot = await getDocs(q)
  const ownersList = ownerSnapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    }),
  )
  for (const doc of ownerSnapshot.docs) {
    const data = doc.data()
    if(data.apartment) {
      const apt = await getApartmentsByRef(data.apartment)
      ownersList.push({ ...data, id: doc.id, apartment: apt })
    }
  }
  return ownersList as Owner[]
}



export const addOwner = async (
  owner: Owner
  ) => {
    const apartmentRef = doc(
      db,
      `apartments/${owner.apartmentId}`,
    )
    const docRef = await addDoc(collection(db, 'owner'), {
      ...owner,
      apartment: apartmentRef,
    })
    return docRef
}

export const deleteOwner = async (id:string) => {
  await deleteDoc(doc(db,`owner/${id}`))
}

export const UpdateOwner = async (
  id: string,
  owner: Owner,
) => {
  const ref =doc(db,`owner/${id}`)

  await updateDoc(ref, {...owner})
}

export const getPaginateOwners = async (
  limitPage: number,
  q = query(
    collection(db,'owner'),
    orderBy('name'),
    limit(limitPage),
  ),
  search = '',
) => {
  const documentSnapshots = await getDocs(q)

  const lastVisible = 
  documentSnapshots.docs[
    documentSnapshots.docs.length -1
  ]

  const firstVisible = documentSnapshots.docs[0]

  const next = query(
    collection(db, 'owner'),
    orderBy('name'),
    endBefore(lastVisible),
    limit(limitPage),
  )

  const previous = query(
    collection(db, 'owner'),
    orderBy('name'),
    endBefore(firstVisible),
    limit(limitPage),
  )

  const ownersList = documentSnapshots.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data()
    }),
  )
  return {
    next,
    owners: ownersList as Owner[],
    previous,
    totalPages: documentSnapshots.size / limitPage,
  }
}