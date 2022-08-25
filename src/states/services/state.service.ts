import {
  addDoc,
  collection,
  deleteDoc,
  doc, endBefore, getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc
} from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'
import { State } from '../interfaces/state.interface'

export const getState = async (): Promise<State[]> => {
  const stateRef = collection(db, 'state')
  const q = query(
    stateRef,
    orderBy('affair'),
    limit(10),
  )
  const stateSnapshot = await getDocs(stateRef)
  const statesList = stateSnapshot.docs.map((doc) =>
    ({
      id: doc.id,
      ...doc.data(),
    })
  )
  return statesList as State[]
}
export const addState = async (state: State) => {
  const docRef = await addDoc(collection(db, 'state'), {
    state,
  })
  return docRef
}

export const deleteStates = async (id: string ) =>{
  await deleteDoc(doc(db, `state/${id}`))
}

export const updateStates = async (id: string, state: State ) =>{
  const ref = doc(db, `state/${id}`)
  await updateDoc(ref,{...state})
}

export const getPaginateStates = async (
  limitPage: number,
  q = query(
    collection(db, 'state'),
    orderBy('affair'),
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
    collection(db, 'state'),
    orderBy('affair'),
    startAfter(lastVisible),
    limit(limitPage),
  )

  const previous = query(
    collection(db, 'state'),
    orderBy('affair'),
    endBefore(firstVisible),
    limit(limitPage),
  )

  const stateLists = documentSnapshots.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    }),
  )

  return {
    next,
    states: stateLists as State[],
    previous,
    totalPages: documentSnapshots.size / limitPage,
  }
}