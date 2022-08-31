import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { ApartmentWrapper } from './apartments/ApartmentWrapper'
import App from './App'
import { AuthWrapper } from './auth/AuthWrapper'
import { RecoveryPassword } from './auth/components/RecoveryPassword'
import { Register } from './auth/components/Register'
import { CustomizationWrapper } from './customizations/CustomizationWrapper'
import { HomeRouter } from './HomeRouter'
import { OwnerWrapper } from './owners/OwnerWrapper'
import { NotFound } from './shared/components/NotFound'
import { ProtectedRouter } from './shared/components/ProtectedRouter'
import { authFirebase } from './shared/services/firebase.service'
import { useAppDispatch } from './shared/store/hooks'
import {
  login,
  logout,
} from './shared/store/slices/auth/authSlice'
import { StatesWrapper } from './states/StatesWrapper'

export const AppRouting = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(authFirebase, async (user) => {
      if (!user) return dispatch(logout(''))
      const { displayName, email, photoURL, uid } = user
      dispatch(
        login({
          displayName,
          email,
          photoURL,
          uid,
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
            <Route
              path="register"
              element={<Register />}
            />
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
