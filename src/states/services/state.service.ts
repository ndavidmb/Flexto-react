import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'
import { db } from '../../shared/services/firebase.service'
import { RootState } from '../../shared/store/store'
import { State } from '../interfaces/state.interface'

export function StateService() {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const addState = async (state: State) => {
    const docRef = await addDoc(
      collection(db, 'state'),
      state,
    )
    return docRef
  }

  const deleteState = async (id: string) => {
    await deleteDoc(doc(db, `state/${id}`))
  }

  const updateState = async (
    id: string,
    state: State,
  ) => {
    const ref = doc(db, `state/${id}`)

    await updateDoc(ref, { ...state })
  }

  const getPaginateStates = async (
    limitPage: number,
    search = '',
  ) => {
    const q = query(
      collection(db, 'state'),
      where(
        'customization',
        '==',
        `customizations/${theme?.id}`,
      ),
    )

    const documentSnapshots = await getDocs(q)
    console.log(documentSnapshots.docs)
    for(const pepito of documentSnapshots.docs){
      console.log(pepito)
    }
    console.log(`/customizations/${theme?.id}`,)
    const StatesList = documentSnapshots.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as State),
      )
      .sort((a, b) => a.affair.localeCompare(b.affair))

    return {
      states: StatesList,
      totalPages: Math.ceil(
        documentSnapshots.size / limitPage,
      ),
    }
  }

  return {
    addState,
    deleteState,
    updateState,
    getPaginateStates,
  }
}