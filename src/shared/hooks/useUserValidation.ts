import { onAuthStateChanged, User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { authFirebase } from '../services/firebase.service'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/auth/authSlice'
import { validateUser } from '../store/slices/auth/thunks'

export const useUserValidation = (id: string) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleUser = async (user: User | null) => {
    if (!user) {
      dispatch(logout())
      navigate(`${id}/auth`)
      return
    }

    const isValidUser = await dispatch(
      validateUser(user, id),
    )

    if (!isValidUser) {
      navigate(`${id}/auth`)
    }
  }

  const getAsyncUser = (): Promise<boolean> => {
    return new Promise((resolve) => {
      onAuthStateChanged(authFirebase, (user) => {
        handleUser(user).then(() => {
          resolve(true)
        })
      })
    })
  }

  return { getAsyncUser }
}
