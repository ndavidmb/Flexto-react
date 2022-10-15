import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import App from './App'
import { AuthWrapper } from './auth/AuthWrapper'
import { RecoveryPassword } from './auth/components/RecoveryPassword'
import { Register } from './auth/components/Register'
import { NotFound } from './shared/components/NotFound'
import { LoadingSvg } from './shared/components/Loading/Loading'

const HomeRouter = lazy(() => import('./HomeRouter'))

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="NotFound" element={<NotFound />} />
          <Route path=":id" element={<App />}>
            <Route index element={<AuthWrapper />} />
            <Route
              path="recovery-password"
              element={<RecoveryPassword />}
            />
            <Route path="register" element={<Register />} />
            <Route
              path="home/*"
              element={
                <Suspense fallback={<LoadingSvg />}>
                  <HomeRouter />
                </Suspense>
              }
            />
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
