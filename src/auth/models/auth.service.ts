import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'
import {
  authFirebase,
  db,
} from '../../shared/services/firebase.service'
import { RootState } from '../../shared/store/store'
import { RoleType } from '../interfaces/user.interface'
import { useFirestoreDocs } from '../../shared/hooks/useFirestoreDocs'
import { CloudStorageFolders } from '../../shared/constants/cloud-storage-folders.constants'

export const signIn = async (credentials: {
  email: string
  password: string
}) => {
  try {
    const result = await signInWithEmailAndPassword(
      authFirebase,
      credentials.email,
      credentials.password,
    )
    const { displayName, email, photoURL, uid } =
      result.user

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    }
  } catch (error: FirebaseError | unknown) {
    if (error instanceof FirebaseError) {
      return {
        ok: false,
        errorMessage:
          'Correo electrónico o contraseña incorrectos',
      }
    }

    console.error(error)
    throw Error(error as string)
  }
}

export const logoutFirebase = async () => {
  return await authFirebase.signOut()
}

export function useAuthService() {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const { uploadFile } = useFirestoreDocs()

  const registerUserFirebase = async (user: {
    email: string
    password: string
    displayName: string
    role: RoleType
    photo: {
      blob: Blob
      name: string
    }
  }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        authFirebase,
        user.email,
        user.password,
      )

      if (authFirebase.currentUser) {
        const url = await uploadFile({
          file: user.photo.blob,
          filename: user.photo.name,
          filepath: CloudStorageFolders.PICTURES,
        })

        return Promise.all([
          updateProfile(authFirebase.currentUser, {
            displayName: user.displayName,
          }),
          addDoc(collection(db, 'registeredUsers'), {
            uid: response.user.uid,
            role: user.role,
            agreement: theme?.id,
            photo: url,
          }),
        ])
          .then(() => {
            // TODO: Implements login
          })
          .catch((error) => {
            console.log(error)
            // TODO: Delete user when fails
            // deleteFirebaseUser(authFirebase.currentUser)
            //   .then(() => console.log('done'))
            //   .catch((err) => console.error(err))
          })
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        const errorMessage = error.message

        return {
          ok: false,
          errorCode,
          errorMessage,
        }
      }

      console.error(error)
      throw Error(error as string)
    }
  }

  const deleteFirebaseUser = (user: User) => {
    if (user) {
      deleteUser(user)
        .then(() => {
          console.log('works well')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return { registerUserFirebase, deleteFirebaseUser }
}
