import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthWrapper } from '../auth/AuthWrapper'
import { RecoveryPassword } from '../auth/components/RecoveryPassword'
import { Register } from '../auth/components/Register'
import { RootState } from '../shared/store/store'

export const PublicRouter = () => {
  const { role } = useSelector(
    (state: RootState) => state.authState,
  )

  if (role === 'admin') {
    return <Navigate to="../home/owners" />
  }

  if (role === 'client') {
    return <Navigate to="../home/request" />
  }

  return (
    <Routes>
      <Route index element={<AuthWrapper />} />
      <Route
        path="recovery-password"
        element={<RecoveryPassword />}
      />
      <Route path="register" element={<Register />} />
      <Route
        path="*"
        element={<Navigate to="/NotFound" replace />}
      />
    </Routes>
  )
}
