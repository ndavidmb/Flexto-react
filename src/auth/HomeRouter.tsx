import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ClientRequestsWrapper } from '../client-requests/ClientRequestsWrapper'
import { LoadingSvg } from '../shared/components/Loading/Loading'
import { RootState } from '../shared/store/store'
import { AdminRouter } from './AdminRouter'
import { AuthWaitApproved } from '../auth/pages/AuthWaitApproved'
import { BookingRouter } from '../booking/BookingRouter'
import { ApartmentClientPage } from '../apartments/pages/ApartmentClientPage'
<<<<<<< HEAD
import { ActRouter } from '../act/ActRouter'
=======
import { PaymentOwnerPage } from '../payments/pages/PaymentOwnerPage'
>>>>>>> b8cdd232b538e7a31d6722878e911decd16484da

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
