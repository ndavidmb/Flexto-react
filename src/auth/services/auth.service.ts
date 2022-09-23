import { FirebaseError } from 'firebase/app'
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import {
  authFirebase,
  googleProvider,
} from '../../shared/services/firebase.service'

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
