import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
} from 'firebase/firestore/lite'
import {
  authFirebase,
  db,
  deleteFile,
  uploadFile,
} from '../../shared/services/firebase.service'

export class AuthModel {
  private password: string
  private email: string
  private uid = ''
  private displayName = ''
  private photoUrl = ''
  private role: 'admin' | 'client' = 'client'

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }

  async signIn(): Promise<void> {
    const result = await signInWithEmailAndPassword(
      authFirebase,
      this.email,
      this.password,
    )

    const { displayName, photoURL, uid } = result.user

    this.displayName = displayName ?? ''
    this.photoUrl = photoURL ?? ''
    this.uid = uid
  }

  static async logOut(): Promise<void> {
    return await authFirebase.signOut()
  }

  async createUser(): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(
      authFirebase,
      this.email,
      this.password,
    )
  }

  async createUserExtra(user: {
    agreement: string
    uid: string
    role: string
  }): Promise<DocumentReference> {
    return await addDoc(
      collection(db, 'registeredUsers'),
      user,
    )
  }

  async deleteUserExtra(extraUserId: string) {
    return await deleteDoc(
      doc(db, `apartments/${extraUserId}`),
    )
  }

  async uploadUserImage(
    blob: Blob,
    name: string,
  ): Promise<string> {
    const url = await uploadFile(blob, name)
    this.photoUrl = url
    return url
  }

  async removeUserImage(name: string) {
    return await deleteFile(name)
  }

  async updateProfile(
    displayName: string,
    photoURL: string,
  ): Promise<void> {
    if (authFirebase.currentUser) {
      console.log(displayName, photoURL)
      return await updateProfile(authFirebase.currentUser, {
        displayName,
        photoURL,
      })
    }

    return Promise.reject(new Error('No existe el usuario'))
  }

  async deleteFirebaseUser(user: User): Promise<void> {
    return await deleteUser(user)
  }

  getUser(): {
    email: string
    uid: string
    displayName: string
    photoUrl: string
    role: 'admin' | 'client'
  } {
    return {
      email: this.email,
      uid: this.uid,
      displayName: this.displayName,
      photoUrl: this.photoUrl,
      role: this.role,
    }
  }
}
