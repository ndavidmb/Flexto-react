import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { State } from '../interfaces/state.interface'

export const useStateRepository = () => {
  const firestore = useFirestore<State>(
    FirestoreTable.STATE,
  )

  const getAllStates = async () => {
    return await firestore.getAllFirestore()
  }

  const addState = async (state: State) => {
    return await firestore.addFirestore(state)
  }

  const updateState = async (id: string, state: State) => {
    return await firestore.updateFirestore(id, state)
  }

  const deleteState = async (id: string) => {
    return await firestore.deleteFirestore(id)
  }

  const getState = async (id: string) => {
    return await firestore.getByParam('id', id)
  }

  return {
    deleteState,
    updateState,
    addState,
    getAllStates,
    getState,
  }
}
