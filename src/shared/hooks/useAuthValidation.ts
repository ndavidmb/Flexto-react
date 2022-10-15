import { onAuthStateChanged, User } from 'firebase/auth'
import { useEffect } from 'react'
import {
  NavigateFunction,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { authFirebase } from '../services/firebase.service'
import { useAppDispatch } from '../store/hooks'
import {
  login,
  logout,
} from '../store/slices/auth/authSlice'

export const useAuthValidation = (
  navigate: NavigateFunction,
  agreement: string | undefined,
) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const invalidUser = () => {
      dispatch(logout())
    }

    const validUser = (user: User) => {
      const { displayName, email, photoURL, uid } = user
      dispatch(
        login({
          displayName: displayName ?? '',
          email: email ?? '',
          photoUrl: photoURL ?? '',
          agreement: agreement ?? '',
          uid,
          role: 'client',
        }),
      )
      navigate('home/owners')
    }

    onAuthStateChanged(authFirebase, async (user) => {
      if (user) {
        validUser(user)
        return
      }

      invalidUser()
    })
  }, [])
}
