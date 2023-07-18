import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
} from 'firebase/auth'
import { CloudStorageFolders } from '../../shared/constants/cloud-storage-folders.constants'
import { useFirestoreDocs } from '../../shared/hooks/useFirestoreDocs'
import { authFirebase } from '../../shared/services/firebase.service'
import { RegisterError } from '../errors/register.error'
import { RegisterFallback } from '../interfaces/register-fallback.interface'
import { IRegisterFirebase } from '../interfaces/register-form.interface'

export const useAuthRepository = () => {
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

  const createCompleteUser = async (
    registerFb: IRegisterFirebase,
  ) => {
    let newUserInstance: User | null = null

    try {
      const { user: newUser } = await createUser({
        email: registerFb.email,
        password: registerFb.password,
      })

      newUserInstance = newUser
      const photoUrl = await uploadUserImage(
        registerFb.photo.blob,
        newUserInstance.uid,
      )

      await updateUserProfile(
        registerFb.displayName,
        photoUrl,
      )

      return { newUserInstance, photoUrl }
    } catch (err) {
      throw new RegisterError(
        'Error al crear el registro',
        { newUserInstance },
      )
    }
  }

  const deleteAppUser = async ({
    newUserInstance,
  }: RegisterFallback) => {
    if (newUserInstance) {
      await Promise.all([
        deleteFirebaseUser(newUserInstance),
        removeUserImage(newUserInstance.uid),
      ])
    }
  }

  const updatePasswordFb = async (
    user: User,
    newPassword: string,
  ) => {
    await updatePassword(user, newPassword)
  }

  const changePasswordEmail = async (email: string) => {
    await sendPasswordResetEmail(authFirebase, email)
  }

  return {
    createUser,
    deleteAppUser,
    deleteFirebaseUser,
    removeUserImage,
    uploadUserImage,
    updateUserProfile,
    updatePasswordFb,
    signIn,
    logOut,
    createCompleteUser,
    changePasswordEmail,
  }
}
