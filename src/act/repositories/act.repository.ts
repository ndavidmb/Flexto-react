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
  const updatePermissionsOwnersAct = (
    actUpdate: ActTemplate,
    uid: string,
  ) => {
    return firestore.updateFirestore(actUpdate.id||'', {
      ...actUpdate,
      permissionsOwnersAct: [
        ...actUpdate.permissionsOwnersAct,
        uid,
      ],
    })
  }

  return {
    getActsByDate,
    updatePermissionsOwnersAct,
  }
}
