import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ClientRequestsWrapper } from '../client-requests/ClientRequestsWrapper'
import { LoadingSvg } from '../shared/components/Loading/Loading'
import { RootState } from '../shared/store/store'
import { AdminRouter } from './AdminRouter'

export const HomeRouter = () => {
  const { role } = useSelector(
    (state: RootState) => state.authState,
  )

  if (role === 'admin') {
    return (
      <Routes>
        <Route path="*" element={<AdminRouter />}></Route>
      </Routes>
    )
  }

  if (role === 'client') {
    return (
      <Routes>
        <Route
          path="request"
          element={<ClientRequestsWrapper />}
        />
        <Route
          path="*"
          element={<Navigate to="/NotFound" replace />}
        />
      </Routes>
    )
  }

  return <LoadingSvg />
}
