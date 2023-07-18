import { where } from 'firebase/firestore/lite'
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

  return { getActsByDate }
}
