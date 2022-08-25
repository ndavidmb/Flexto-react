import { DocumentData } from 'firebase/firestore/lite'

export interface Owner {
  name: string
  phone: string
  email: string
  apartment?: DocumentData | undefined
  id?: string
  apartmentId?: string
}
