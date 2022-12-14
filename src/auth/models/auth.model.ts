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
  getDocs,
} from 'firebase/firestore/lite'
import {
  authFirebase,
  db,
  deleteFile,
  uploadFile,
} from '../../shared/services/firebase.service'
import {
  IExtraUser,
  RoleType,
} from '../interfaces/user.interface'

export class AuthModel {
  private password: string
  private email: string
  private displayName = ''
  private photoUrl = ''
  private role: RoleType = 'client'
  uid = ''

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

  async getExtraUser() {
    const registerUsers = collection(db, 'registeredUsers')
    const registeredUserSnapshot = await getDocs(
      registerUsers,
    )
    const extraUsersFields = registeredUserSnapshot.docs
      .map((doc) => doc.data() as IExtraUser)
      .filter((f) => f.uid === this.uid)

    if (extraUsersFields.length > 1) {
      throw new Error(
        'Should exist just one user with the uid',
      )
    }

    return extraUsersFields[0]
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

  async createUserExtra(
    user: IExtraUser,
  ): Promise<DocumentReference> {
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
    role: RoleType
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
