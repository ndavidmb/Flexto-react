import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import {
  getAuth, GoogleAuthProvider,
} from 'firebase/auth'

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

export const db = getFirestore(app)

export const authFirebase = getAuth(app)

export const googleProvider = new GoogleAuthProvider()