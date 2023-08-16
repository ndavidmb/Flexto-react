import { documentId, where } from 'firebase/firestore/lite'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { ActTemplate } from '../interfaces/act-templates.interface'

export const useActRepository = () => {
  const firestore = useFirestore<ActTemplate>(
    FirestoreTable.ACT,
  )

  const getActsByDate = (date: string) => {
    return firestore.getAllFirestore([
      where('date', '==', date),
    ])
  }

  const getActsByOwner = async (ids: string[]) => {
    return firestore.getAllFirestore([
      where(documentId(), 'in', ids),
    ])
  }

  const getActs = async () => {
    return firestore.getAllFirestore()
  }

  return {
    getActsByDate,
    getActsByOwner,
    getActs,
  }
}
