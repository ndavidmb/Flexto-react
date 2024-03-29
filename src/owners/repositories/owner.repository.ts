import { documentId, where } from 'firebase/firestore/lite'
import { UserRoles } from '../../auth/interfaces/user-roles.enums'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { OwnerDTO } from '../interfaces/owner.interface'

export const useOwnerRepository = () => {
  const firestore = useFirestore<OwnerDTO>(
    FirestoreTable.REGISTERED_USER,
  )

  const getAllOwners = async () => {
    return await firestore.getAllFirestore([
      where('role', '==', UserRoles.CLIENT),
    ])
  }

  const getActiveOwners = async () => {
    return await firestore.getAllFirestore([
      where('role', '==', UserRoles.CLIENT),
      where('accepted', '==', true),
      where('deleted', '==', false),
    ])
  }

  const getOwnersByState = async (stateId: string) => {
    return await firestore.getAllFirestore([
      where('role', '==', UserRoles.CLIENT),
      where('states', 'array-contains', stateId),
    ])
  }

  const createOwner = async (user: OwnerDTO) => {
    return await firestore.addFirestore(user)
  }

  const deleteOwner = async (ownerId: string) => {
    return await firestore.deleteFirestore(ownerId)
  }

  const activateOwnerAccount = async (
    id: string,
    owner: OwnerDTO,
  ) => {
    try {
      await firestore.updateFirestore(id, {
        ...owner,
        accepted: true,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const getOwnerByUid = async (uid: string) => {
    const [owner] = await firestore.getByParam('uid', uid)
    return owner
  }

  const getOwnerById = async (ownerId: string) => {
    return await firestore.getById(ownerId)
  }

  const updateOwner = async (
    id: string,
    updatedUser: OwnerDTO,
  ) => {
    await firestore.updateFirestore(id, updatedUser)
  }
  
  const updateActOwner = async (
    id: string,
    updatedUser: OwnerDTO,
  ) => {
    await firestore.updateFirestore(id, updatedUser)
  }

  const getOwnerByEmail = async (email: string) => {
    const [owner] = await firestore.getByParam(
      'email',
      email,
    )

    return owner
  }

  const getOwnersWithIds = (ids: string[]) => {
    return firestore.getAllFirestore([
      where(documentId(), 'in', ids),
    ])
  }

  const deleteTemporallyUser = (owner: OwnerDTO) => {
    return firestore.updateFirestore(owner.id!, {
      ...owner,
      deleted: true,
    })
  }

  return {
    getOwnerByUid,
    getAllOwners,
    getOwnersWithIds,
    getOwnerById,
    getOwnerByEmail,
    getActiveOwners,
    activateOwnerAccount,
    deleteTemporallyUser,
    deleteOwner,
    createOwner,
    getOwnersByState,
    updateOwner,
    updateActOwner
  }
}
