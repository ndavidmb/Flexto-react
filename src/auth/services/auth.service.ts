import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore/lite'
import { useSelector } from 'react-redux'
import {
  authFirebase,
  db,
  googleProvider,
  uploadFile,
} from '../../shared/services/firebase.service'
import { RootState } from '../../shared/store/store'

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

export const signInGoogle = async () => {
  try {
    const result = await signInWithPopup(
      authFirebase,
      googleProvider,
    )

    // const credentials =
    //   GoogleAuthProvider.credentialFromResult(result)

    const { displayName, email, photoURL, uid } =
      result.user

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: FirebaseError | unknown) {
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

export const logoutFirebase = async () => {
  return await authFirebase.signOut()
}

export function useAuthService() {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )
  const registerUserFirebase = async (user: {
    email: string
    password: string
    displayName: string
    role: 'admin' | 'client'
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
        const url = await uploadFile(
          user.photo.blob,
          user.photo.name,
        )
        return Promise.all([
          updateProfile(authFirebase.currentUser, {
            displayName: user.displayName,
          }),
          addDoc(collection(db, 'registeredUsers'), {
            uid: response.user.uid,
            role: user.role,
            agreement: theme?.id,
            photo: url,
          })
            .then(() => {
              const { uid, photoURL, email, displayName } =
                response.user

              return {
                ok: true,
                uid,
                photoURL,
                email,
                displayName,
              }
            })
            .catch((error) => {
              console.log(error)
              // TODO: Delete user when fails
              // deleteFirebaseUser(authFirebase.currentUser)
              //   .then(() => console.log('done'))
              //   .catch((err) => console.error(err))
            }),
        ])
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
