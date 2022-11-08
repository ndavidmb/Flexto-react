import { onAuthStateChanged, User } from 'firebase/auth'
import { useEffect } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { authFirebase } from '../services/firebase.service'
import { logout } from '../store/slices/auth/authSlice'
import { validateUser } from '../store/slices/auth/thunks'
import { AppDispatch } from '../store/store'

export function useUserValidation(
  dispatch: AppDispatch,
  id: string,
  navigate: NavigateFunction,
) {
  useEffect(() => {
    const invalidUser = () => {
      dispatch(logout())
      navigate(`/${id}/auth`)
    }

    const validUser = async (user: User) => {
      const isValid = await dispatch(validateUser(user, id))
      if (!isValid) {
        navigate(`/${id}/auth`)
      }
    }

    onAuthStateChanged(authFirebase, async (user) => {
      if (user) {
        await validUser(user)
        return
      }

      invalidUser()
    })
  }, [])
}
