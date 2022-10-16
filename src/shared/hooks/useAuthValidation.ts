import { onAuthStateChanged, User } from 'firebase/auth'
import { useEffect } from 'react'
import {
  NavigateFunction,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { AuthController } from '../../auth/controllers/auth.controller'
import { AuthModel } from '../../auth/models/auth.model'
import { authFirebase } from '../services/firebase.service'
import { useAppDispatch } from '../store/hooks'
import {
  addExtra,
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

    const validUser = async (user: User) => {
      const { displayName, email, photoURL, uid } = user
      dispatch(
        login({
          displayName: displayName ?? '',
          email: email ?? '',
          photoUrl: photoURL ?? '',
          agreement: agreement ?? '',
          uid,
        }),
      )
      navigate('home/owners')

      const authModel = new AuthModel(email ?? '', '')
      authModel.uid = uid
      const extraUser = await authModel.getExtraUser()
      dispatch(
        addExtra({
          role: extraUser.role,
        }),
      )
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
