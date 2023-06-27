import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'
import { db } from '../services/firebase.service'
import { RootState } from '../store/store'
import { useParams } from 'react-router-dom'

export function useFirestore<T>(tableName: string) {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )
  const { id } = useParams()

  const addFirestore = async (data: Omit<T, 'id'>) => {
    const docRef = await addDoc(collection(db, tableName), {
      ...data,
      customization: `customizations/${theme?.id}`,
    })
    return docRef
  }

  const deleteFirestore = async (id: string) => {
    await deleteDoc(doc(db, `${tableName}/${id}`))
  }

  const updateFirestore = async (id: string, data: T) => {
    const ref = doc(db, `${tableName}/${id}`)
    const customization = `customizations/${theme.id || id}`
    return await updateDoc(ref, {
      ...data,
      customization,
    })
  }

  const getAllFirestore = async () => {
    if (!theme.id && !id) {
      return []
    }
    const customization = `customizations/${id || theme.id}`
    const q = query(
      collection(db, tableName),
      where(
        'customization',
        '==',
        customization,
      ),
    )

    const documentSnapshots = await getDocs(q)

    const dataList = documentSnapshots.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as T),
    )

    return dataList
  }

  return {
    getAllFirestore,
    updateFirestore,
    deleteFirestore,
    addFirestore,
  }
}
