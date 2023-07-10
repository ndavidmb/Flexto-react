import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { PublicSpace } from '../interfaces/public-space.interface'

export const usePublicSpacesRepository = () => {
  const firestore = useFirestore<PublicSpace>(
    FirestoreTable.PUBLIC_SPACES,
  )

  const getAll = async () => {
    return await firestore.getAllFirestore()
  }

  const create = async (space: PublicSpace) => {
    return await firestore.addFirestore(space)
  }

  const updatePublicSpace = async (space: PublicSpace) => {
    return await firestore.updateFirestore(space.id!, space)
  }

  const deletePublicSpace = async (id: string) => {
    return await firestore.deleteFirestore(id)
  }

  return {
    getAll,
    create,
    updatePublicSpace,
    deletePublicSpace,
  }
}
