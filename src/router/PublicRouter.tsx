import { Navigate, Route, Routes } from 'react-router-dom'
import { RecoveryPassword } from '../auth/components/RecoveryPassword'
import { Register } from '../auth/components/Register'
import { AuthWrapper } from '../auth/pages/AuthWrapper'
import { Loading } from '../shared/components/Loading/Loading'

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
        path="*"
        element={<Navigate to="/NotFound" replace />}
      />
    </Routes>
  )
}
