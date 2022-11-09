import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'
import { Theme } from '../interfaces/theme.interface'

let currentId: string | null = null
let cacheResponse: Theme | null = null

export function useCustomizationService() {
  const getCustomizationById = async (
    id: string,
  ): Promise<Theme> => {
    if (currentId !== id) {
      currentId = id
      const docRef = doc(db, `customizations/${id}`)

      const customizationSnapshot = await getDoc(docRef)

      if (!customizationSnapshot.exists()) {
        throw new Error("Theme doesn't exist")
      }

      cacheResponse = {
        id: customizationSnapshot.id,
        ...customizationSnapshot.data(),
      } as Theme
    }

    return cacheResponse as Theme
  }

  const addCustomization = async (customization: Theme) => {
    const docRef = await addDoc(
      collection(db, 'customizations'),
      customization,
    )

    return docRef
  }

  const updateCustomization = async (
    customization: Theme,
  ) => {
    const { id, ...rest } = customization
    const docRef = doc(db, `customizations/${id}`)

    await updateDoc(docRef, rest)
  }

  return {
    getCustomizationById,
    addCustomization,
    updateCustomization,
  }
}
