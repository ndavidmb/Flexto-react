import { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import App from '../App'
import { LoadingSvg } from '../shared/components/Loading/Loading'
import { NotFound } from '../shared/components/NotFound'
import { PublicRouter } from './PublicRouter'

import { AuthWrapper } from '../auth/AuthWrapper'
import { RecoveryPassword } from '../auth/components/RecoveryPassword'
import { Register } from '../auth/components/Register'
const HomeRouter = lazy(() => import('./HomeRouter'))

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="NotFound" element={<NotFound />} />
        <Route path=":id" element={<App />}>
          <Route
            path="home/*"
            element={
              <Suspense fallback={<LoadingSvg />}>
                <HomeRouter />
              </Suspense>
            }
          />
          <Route path="auth/*" element={<PublicRouter />} />
          <Route
            index
            element={<Navigate to="auth" replace />}
          />
          <Route
            path="*"
            element={<Navigate to="auth" replace />}
          />
        </Route>
        <Route
          path="*"
          element={<Navigate to="/NotFound" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
