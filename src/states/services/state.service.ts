import {
  addDoc,
  collection,
  getDocs
} from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'
import { State } from '../interfaces/state.interface'

export const getState = async (): Promise<State[]> => {
  const statesCol = collection(db, 'state')
  const stateSnapshot = await getDocs(statesCol)
  const statesList = stateSnapshot.docs.map((doc) =>
    doc.data(),
  )
  return statesList as State[]
}
export const addState = async (state: State) => {
  const docRef = await addDoc(collection(db, 'state'), {
    state,
  })
}
