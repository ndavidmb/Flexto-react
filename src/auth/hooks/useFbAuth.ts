import { User, onAuthStateChanged } from 'firebase/auth'
import { authFirebase } from '../../shared/services/firebase.service'

import { useAuthViewController } from '../controllers/auth.view.controller'

export const useFbAuth = (id: string) => {
  const authController = useAuthViewController(id)

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
