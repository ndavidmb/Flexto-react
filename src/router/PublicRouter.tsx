import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthWrapper } from '../auth/AuthWrapper'
import { RecoveryPassword } from '../auth/components/RecoveryPassword'
import { Register } from '../auth/components/Register'
import { Loading } from '../shared/components/Loading/Loading'
import { RootState } from '../shared/store/store'
import { UserRoles } from '../auth/interfaces/user-roles.enums'

export const PublicRouter = () => {
  const { role, isLogged } = useSelector(
    (state: RootState) => state.authState,
  )

  if (role === UserRoles.ADMIN && isLogged) {
    return <Navigate to="../home/owners" />
  }

  if (role === UserRoles.CLIENT && isLogged) {
    return <Navigate to="../home/request" />
  }

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
