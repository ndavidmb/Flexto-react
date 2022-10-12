import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import App from './App'
import { AuthWrapper } from './auth/AuthWrapper'
import { RecoveryPassword } from './auth/components/RecoveryPassword'
import { Register } from './auth/components/Register'
import { HomeRouter } from './HomeRouter'
import { NotFound } from './shared/components/NotFound'
import { authFirebase } from './shared/services/firebase.service'
import { useAppDispatch } from './shared/store/hooks'
import {
  login,
  logout,
} from './shared/store/slices/auth/authSlice'

export const AppRouting = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(authFirebase, async (user) => {
      if (!user) return dispatch(logout())
      const { displayName, email, photoURL, uid } = user
      console.log(photoURL, displayName)
      dispatch(
        login({
          displayName: displayName ?? '',
          email: email ?? '',
          photoUrl: photoURL ?? '',
          uid,
          role: 'client',
        }),
      )
    })
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="NotFound" element={<NotFound />} />
          <Route path=":id" element={<App />}>
            <Route
              path="recovery-password"
              element={<RecoveryPassword />}
            />
            <Route path="register" element={<Register />} />
            <Route index element={<AuthWrapper />} />
            <Route path="home/*" element={<HomeRouter />} />
          </Route>
          <Route
            index
            element={<Navigate to="/NotFound" replace />}
          />
          <Route
            path="*"
            element={<Navigate to="/NotFound" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
