import { Navigate, Route, Routes } from 'react-router-dom'
import { RecoveryPassword } from './components/RecoveryPassword'
import { Register } from './components/Register'
import { AuthWrapper } from './pages/AuthWrapper'
import { Loading } from '../shared/components/Loading/Loading'
import { ForgetPasswordPage } from './pages/ForgetPasswordPage'

export const PublicRouter = () => {
  return (
    <Routes>
      <Route index element={<AuthWrapper />} />
      <Route
        path="recovery-password"
        element={<RecoveryPassword />}
      />
      <Route
        path="register"
        element={
          <>
            <Register />
            <Loading />
          </>
        }
      />
      <Route
        path="forgot-password"
        element={<ForgetPasswordPage />}
      />
      <Route
        path="*"
        element={<Navigate to="/NotFound" replace />}
      />
    </Routes>
  )
}
