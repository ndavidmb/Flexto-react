import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { authFirebase } from '../../shared/services/firebase.service'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { IExtraUser } from '../interfaces/user.interface'
import { useFirestoreDocs } from '../../shared/hooks/useFirestoreDocs'
import { CloudStorageFolders } from '../../shared/constants/cloud-storage-folders.constants'

export const useAuthService = () => {
  const firestoreRegisteredUser = useFirestore<IExtraUser>(
    FirestoreTable.REGISTERED_USER,
  )
  const firestoreDocs = useFirestoreDocs()

  const createUser = async (user: {
    email: string
    password: string
  }): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(
      authFirebase,
      user.email,
      user.password,
    )
  }

  const createUserExtra = async (user: IExtraUser) => {
    return await firestoreRegisteredUser.addFirestore(user)
  }

  const deleteUserExtra = async (extraUserId: string) => {
    return await firestoreRegisteredUser.deleteFirestore(
      extraUserId,
    )
  }

  const getExtraUser = async (uid: string) => {
    const registeredUsers =
      await firestoreRegisteredUser.getAllFirestore()

    const currentUsers = registeredUsers.filter(user => user.uid === uid)

    if (currentUsers.length > 1) {
      throw new Error(
        'Should exist just one user with the uid',
      )
    }

    return currentUsers[0]
  }

  const uploadUserImage = async (
    blob: Blob,
    name: string,
  ): Promise<string> => {
    const url = await firestoreDocs.uploadFile({
      file: blob,
      filename: name,
      filepath: CloudStorageFolders.PICTURES,
    })
    return url
  }

  const removeUserImage = async (name: string) => {
    await firestoreDocs.deleteFile(
      name,
      CloudStorageFolders.PICTURES,
    )
  }

  const updateUserProfile = async (
    displayName: string,
    photoURL: string,
  ) => {
    if (authFirebase.currentUser) {
      return await updateProfile(authFirebase.currentUser, {
        displayName,
        photoURL,
      })
    }

    return Promise.reject(new Error('No existe el usuario'))
  }

  const deleteFirebaseUser = async (user: User) => {
    return await deleteUser(user)
  }

  const signIn = async (
    email: string,
    password: string,
  ) => {
    return await signInWithEmailAndPassword(
      authFirebase,
      email,
      password,
    )
  }

  const logOut = async () => {
    return await authFirebase.signOut()
  }

  return {
    createUser,
    createUserExtra,
    deleteUserExtra,
    deleteFirebaseUser,
    getExtraUser,
    removeUserImage,
    uploadUserImage,
    updateUserProfile,
    signIn,
    logOut,
  }
}
