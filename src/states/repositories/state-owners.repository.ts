import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { StateOwner } from '../interfaces/state-owners.interface'

export const useStateOwnersRepository = () => {
  const firestore = useFirestore<StateOwner>(
    FirestoreTable.STATE_OWNERS,
  )

  const getStateOwners = async () => {
    return await firestore.getAllFirestore()
  }

  const createStateOwner = async (
    stateOwner: StateOwner,
  ) => {
    return await firestore.addFirestore(stateOwner)
  }

  return { getStateOwners, createStateOwner }
}
