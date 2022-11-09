import { useFirestore } from '../../shared/hooks/useFirestore'
import { Owner } from '../interfaces/owner.interface'

export function useOwnerService() {
  const firestore = useFirestore<Owner>('owner')

  const addOwner = async (owner: Owner) => {
    const docRef = await firestore.addFirestore(owner)
    return docRef
  }

  const deleteOwner = async (id: string) => {
    await firestore.deleteFirestore(id)
  }

  const updateOwner = async (
    id: string,
    owner: Owner,
  ) => {
    return await firestore.updateFirestore(id, owner)
  }

  const getOwners = async () => {
    const owners = await firestore.getAllFirestore()


    return owners
  }

  return {
    addOwner,
    deleteOwner,
    updateOwner,
    getOwners,
  }
}
