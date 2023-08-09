import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ActRouter } from '../act/ActRouter'
import { ApartmentClientPage } from '../apartments/pages/ApartmentClientPage'
import { AuthWaitApproved } from '../auth/pages/AuthWaitApproved'
import { BookingRouter } from '../booking/BookingRouter'
import { ClientRequestsWrapper } from '../client-requests/ClientRequestsWrapper'
import { PaymentOwnerPage } from '../payments/pages/PaymentOwnerPage'
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
          path="apartment"
          element={<ApartmentClientPage />}
        />
        <Route
          path="request"
          element={<ClientRequestsWrapper />}
        />
        <Route
          path="wait-approved"
          element={<AuthWaitApproved />}
        />
        <Route
          path="booking/*"
          element={<BookingRouter />}
        />

        <Route
          path="payments"
          element={<PaymentOwnerPage />}
        />

        <Route
          path="act"
          element={<ActRouter />}
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
