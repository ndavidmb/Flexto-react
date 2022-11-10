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

  const updateOwner = async (id: string, owner: Owner) => {
    return await firestore.updateFirestore(id, owner)
  }

  const getOwners = async () => {
    const owners = await firestore.getAllFirestore()

    return owners
  }

  const getOwnerById = async (id: string) => {
    const owners = await getOwners()
    const owner = owners.find((owner) => owner.id === id)

    if (!owner) {
      throw new Error('Owner not found')
    }

    return owner
  }

  return {
    addOwner,
    deleteOwner,
    updateOwner,
    getOwners,
    getOwnerById,
  }
}
