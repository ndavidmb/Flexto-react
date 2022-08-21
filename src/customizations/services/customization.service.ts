import {
  addDoc,
  collection,
  doc,
  getDoc,
} from 'firebase/firestore/lite'
import { db } from '../../shared/services/firebase.service'
import { Theme } from '../interfaces/theme.interface'

let currentId: string | null = null
let cacheResponse: Theme | null = null

export const getCustomizationById = async (
  id: string,
): Promise<Theme> => {
  if (currentId !== id) {
    currentId = id
    const docRef = doc(db, `customizations/${id}`)

    const customizationSnapshot = await getDoc(docRef)

    if (!customizationSnapshot.exists()) {
      throw new Error("Theme doesn't exist")
    }

    console.log(customizationSnapshot.data())
    cacheResponse = {
      id: customizationSnapshot.id,
      ...customizationSnapshot.data(),
    } as Theme
  }

  return cacheResponse as Theme
}
export const addCustomization = async (
  customization: Theme,
) => {
  const docRef = await addDoc(
    collection(db, 'customization'),
    customization,
  )

  return docRef
}
