import {
  ReplaySubject,
  Subscription,
  audit,
  concat,
  first,
} from 'rxjs'
import { useThemeController } from './useTheme'
import { User, onAuthStateChanged } from 'firebase/auth'
import { authFirebase } from '../services/firebase.service'
import { useEffect, useState } from 'react'
import { isRegistering$ } from '../services/register.service'
import { useAppDispatch } from '../store/hooks'
import { useAuthFacade } from '../../auth/facades/auth.facade'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/auth/authSlice'
import { validateUser } from '../store/slices/auth/thunks'
import { UserRoles } from '../../auth/interfaces/user-roles.enums'

export const useSetup = (id: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const themeController = useThemeController(id)
  const dispatch = useAppDispatch()
  const authFacade = useAuthFacade()
  const navigate = useNavigate()

  useEffect(() => {
    let sub: Subscription
    const loggedInSubject = new ReplaySubject<User | null>(
      1,
    )
    setup(loggedInSubject)
      .then((subs) => (sub = subs))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const setup = async (
    loggedInSubject: ReplaySubject<User | null>,
  ) => {
    await themeController.setup()

    onAuthStateChanged(authFirebase, loggedInSubject)

    return concat(
      loggedInSubject.pipe(first()),
      loggedInSubject.pipe(audit(() => isRegistering$)),
    ).subscribe((user) => {
      console.log(user);
      handleUser(user)
    })
  }

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

  return { isLoading }
}
