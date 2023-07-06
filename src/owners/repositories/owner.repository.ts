import { where } from 'firebase/firestore/lite'
import { UserRoles } from '../../auth/interfaces/user-roles.enums'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { OwnerDTO } from '../interfaces/owner.interface'
import { State } from '../../states/interfaces/state.interface'

export const useOwnerRepository = () => {
  const firestore = useFirestore<OwnerDTO>(
    FirestoreTable.REGISTERED_USER,
  )

  const getAllOwners = async () => {
    return await firestore.getAllFirestore([
      where('role', '==', UserRoles.CLIENT),
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
    await firestore.updateFirestore(id, {
      ...owner,
      accepted: true,
    })
  }

  const getOwnerByUid = async (uid: string) => {
    const [owner] = await firestore.getByParam('uid', uid)
    return owner
  }

  const updateOwner = async (
    id: string,
    updatedUser: OwnerDTO,
  ) => {
    await firestore.updateFirestore(id, updatedUser)
  }

  return {
    getOwnerByUid,
    getAllOwners,
    activateOwnerAccount,
    deleteOwner,
    createOwner,
    getOwnersByState,
    updateOwner,
  }
}
