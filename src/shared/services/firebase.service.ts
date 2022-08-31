import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBc2Fkk9536EpTPTujmUIFa9WyACoPGEMQ',
  authDomain: 'flexto-2bebc.firebaseapp.com',
  databaseURL:
    'https://flexto-2bebc-default-rtdb.firebaseio.com',
  projectId: 'flexto-2bebc',
  storageBucket: 'flexto-2bebc.appspot.com',
  messagingSenderId: '483083084972',
  appId: '1:483083084972:web:b24a08e5ed130b5f01ab09',
  measurementId: 'G-3QLX3Z3GY7',
}

// Initialize Firebase~
const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

export const db = getFirestore(app)

export const authFirebase = getAuth(app)

// TODO: Remove google provider
export const googleProvider = new GoogleAuthProvider()

export const uploadFile = async (
  file: Blob,
  filename: string,
) => {
  const storageRef = ref(storage, `pictures/${filename}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}
