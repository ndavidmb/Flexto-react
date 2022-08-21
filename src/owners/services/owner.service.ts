import {
  addDoc,
  collection,
  getDocs
} from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'
import { Owner } from '../interfaces/owner.interface'

export const getOwner = async (): Promise<Owner[]> => {
  const ownersCol = collection(db, 'owner')
  const ownerSnapshot = await getDocs(ownersCol)
  const ownersList = ownerSnapshot.docs.map((doc) =>
    doc.data(),
  )
  return ownersList as Owner[]
}
export const addOwner = async (owner: Owner) => {
  const docRef = await addDoc(collection(db, 'owner'), {
    owner,
  })
}
