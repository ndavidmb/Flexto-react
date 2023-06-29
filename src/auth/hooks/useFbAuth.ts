import { User, onAuthStateChanged } from 'firebase/auth'
import { authFirebase } from '../../shared/services/firebase.service'

import { useAuthController } from '../controllers/auth.controller'

export const useFbAuth = (id: string) => {
  const authController = useAuthController(id)

  const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
      onAuthStateChanged(authFirebase, (user) => {
        resolve(user)
      })
    })
  }

  const getRedirectPath = async (user: User | null) => {
    await authController.signInFirebase(user);
  }

  return { getCurrentUser, getRedirectPath }
}
