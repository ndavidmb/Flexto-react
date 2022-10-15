
import {
  addDoc,
  collection,
  deleteDoc,
  doc, getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'
import { db } from '../../shared/services/firebase.service'
import { RootState } from '../../shared/store/store'
import { Owner } from '../interfaces/owner.interface'

export function OwnerService() {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const addOwner = async (
    owner: Owner
    ) => {
      const apartmentRef = doc(
        db,
        `apartments/${owner.apartmentId}`,
      )
      const docRef = await addDoc(
        collection(db, 'owner'), {
        ...owner,
        apartment: apartmentRef,
      })
      return docRef
  }

  const deleteOwner = async (id:string) => {
    await deleteDoc(doc(db,`owner/${id}`))
  }

  const updateOwner = async (
    id: string,
    owner: Owner,
  ) => {
    const ref =doc(db,`owner/${id}`)
    await updateDoc(ref, {...owner})
  }

  const getPaginateOwners = async (
    limitPage: number,
    search = '',
  ) => {
    const q = query(
      collection(db, 'owner'),
      where(
        'customization',
        '==',
        `customizations/${theme?.id}`,
      ),
    )

    const documentSnapshots = await getDocs(q)

    const ownerList = documentSnapshots.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Owner),
      )
      .sort((a, b) => a.name.localeCompare(b.name))

    return {
      owners: ownerList,
      totalPages: Math.ceil(
        documentSnapshots.size / limitPage,
      ),
    }
  }

  return {
    addOwner,
    deleteOwner,
    updateOwner,
    getPaginateOwners,
  }
}