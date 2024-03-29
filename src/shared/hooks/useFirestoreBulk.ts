import {
  WriteBatch,
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch
} from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { db } from '../services/firebase.service'
import { RootState } from '../store/store'

export function useFirestoreBulk<T extends { id: string }>(
  tableName: string,
) {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )
  const { id } = useParams()

  const getWithDocRef = async () => {
    if (!theme.id && !id) {
      return []
    }

    const customization = `customizations/${id || theme.id}`
    const q = query(
      collection(db, tableName),
      where('customization', '==', customization),
    )

    const documentSnapshots = await getDocs(q)

    const dataList = documentSnapshots.docs.map((doc) => ({
      ...(doc.data() as T),
      docRef: doc.ref,
      id: doc.id,
    }))

    return dataList
  }

  const bulkDelete = (
    dbBatch: WriteBatch,
    deleteIds: T[],
  ) => {
    deleteIds.forEach(({ id }) => {
      const ref = doc(db, `${tableName}/${id}`)
      dbBatch.delete(ref)
    })
  }

  const bulkCreate = (
    dbBatch: WriteBatch,
    data: Omit<T, 'id'>[],
  ) => {
    const tableRef = doc(collection(db, tableName))
    data.forEach((d) => {
      dbBatch.set(tableRef, {
        ...d,
        customization: `customizations/${theme?.id}`,
      })
    })
  }

  const bulkUpdate = (
    dbBatch: WriteBatch,
    data: T[],
    keyToDelete: keyof T,
  ) => {
    data.forEach((d) => {
      const ref = doc(db, `${tableName}/${d[keyToDelete]}`)

      dbBatch.set(ref, {
        ...d,
        customization: `customizations/${theme?.id}`,
      })
    })
  }

  const getBatch = () => {
    return writeBatch(db)
  }

  const commitBatch = (dbBatch: WriteBatch) => {
    return dbBatch.commit()
  }

  return {
    getBatch,
    getWithDocRef,
    bulkDelete,
    bulkCreate,
    bulkUpdate,
    commitBatch,
  }
}
