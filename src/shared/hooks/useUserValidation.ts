// import { onAuthStateChanged, User } from 'firebase/auth'
// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   audit,
//   concat,
//   first,
//   ReplaySubject
// } from 'rxjs'
// import { useAuthFacade } from '../../auth/facades/auth.facade'
// import { UserRoles } from '../../auth/interfaces/user-roles.enums'
// import { authFirebase } from '../services/firebase.service'
// import { useAppDispatch } from '../store/hooks'
// import { logout } from '../store/slices/auth/authSlice'
// import { validateUser } from '../store/slices/auth/thunks'

// export const useUserValidation = (id: string) => {
//   const dispatch = useAppDispatch()
//   const authFacade = useAuthFacade()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const loggedInSubject = new ReplaySubject<User | null>(1)
//     onAuthStateChanged(authFirebase, loggedInSubject)

//     const sub = concat(
//       loggedInSubject.pipe(first()),
//       loggedInSubject.pipe(audit(() => isRegistering$)),
//     ).subscribe((user) => {
//       handleUser(user)
//     })

//     return () => {
//       sub.unsubscribe()
//     }
//   }, [])

//   const handleUser = async (user: User | null) => {
//     if (!user) {
//       dispatch(logout())
//       navigate(`/${id}/auth`)
//       return
//     }

//     const extraUser = await authFacade.getExtraUser(
//       user.uid,
//     )

//     if (!extraUser) {
//       return
//     }

//     const isValidUser = await dispatch(
//       validateUser(user, extraUser, id),
//     )

//     if (!isValidUser) {
//       navigate(`/${id}/auth`)
//     }

//     if (!extraUser.accepted) {
//       navigate(`/${id}/home/wait-approved`)
//       return
//     }

//     if (extraUser.role === UserRoles.ADMIN) {
//       navigate(`/${id}/home/owners`)
//     }

//     if (extraUser.role === UserRoles.CLIENT) {
//       navigate(`/${id}/home/request`)
//     }
//   }
// }
