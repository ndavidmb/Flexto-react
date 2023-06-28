import { onAuthStateChanged, User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { audit, concat, first, ReplaySubject } from 'rxjs'
import { useAuthFacade } from '../../auth/facades/auth.facade'
import { UserRoles } from '../../auth/interfaces/user-roles.enums'
import { authFirebase } from '../services/firebase.service'
import { isRegistering$ } from '../services/register.service'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/slices/auth/authSlice'
import { validateUser } from '../store/slices/auth/thunks'
import { useEffect } from 'react'
import { Subscription } from 'rxjs'

export const useUserValidation = (id: string) => {
  const dispatch = useAppDispatch()
  const authFacade = useAuthFacade()
  const navigate = useNavigate()
  const loggedInSubject = new ReplaySubject<User | null>(1)
  let subscription: Subscription

  const handleUser = async (user: User | null) => {
    if (!user) {
      dispatch(logout())
      navigate(`/${id}/auth`)
      return
    }

    const extraUser = await authFacade.getExtraUser(
      user.uid,
    )

    if (!extraUser) {
      return
    }

    const isValidUser = await dispatch(
      validateUser(user, extraUser, id),
    )

    if (!isValidUser) {
      navigate(`/${id}/auth`)
    }

    if (!extraUser.accepted) {
      navigate(`/${id}/home/wait-approved`)
      return
    }

    if (extraUser.role === UserRoles.ADMIN) {
      navigate(`/${id}/home/owners`)
    }

    if (extraUser.role === UserRoles.CLIENT) {
      navigate(`/${id}/home/request`)
    }
  }

  const getAsyncUser = () => {
    onAuthStateChanged(authFirebase, loggedInSubject)

    console.log('entro');
    subscription = concat(
      loggedInSubject.pipe(first()),
      loggedInSubject.pipe(audit(() => isRegistering$)),
    ).subscribe((user) => {
      console.log(user)
      handleUser(user)
    })
  }

  return { getAsyncUser }
}
