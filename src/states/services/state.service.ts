import { useFirestore } from '../../shared/hooks/useFirestore'
import { State } from '../interfaces/state.interface'

export function useStateService() {
  const firestore = useFirestore<State>('state')

  const addState = async (state: State) => {
    const docRef = await firestore.addFirestore(state)
    return docRef
  }

  const deleteState = async (id: string) => {
    await firestore.deleteFirestore(id)
  }

  const updateState = async (
    id: string,
    state: State,
  ) => {
    return await firestore.updateFirestore(id, state)
  }

  const getStates = async () => {
    const states = await firestore.getAllFirestore()

    // Consejo para debug
    return states
  }

  return {
    addState,
    deleteState,
    updateState,
    getStates,
  }
}