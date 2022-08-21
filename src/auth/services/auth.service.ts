import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../shared/services/firebase.service'

export const signIn = async (credentials: {
  email: string
  password: string
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    )
    return userCredential.user
  } catch (error: FirebaseError | unknown) {
    if (error instanceof FirebaseError) {
      throw Error(
        'Correo electrónico o contraseña incorrectos',
      )
    }

    console.error(error)
    throw Error(error as string)
  }
}
