import { Route, Routes } from 'react-router-dom'
import { PaymentsPage } from './pages/PaymentsPage'
import { PaymentUserPage } from './pages/PaymentUserPage'

export const PaymentRouter = () => {
  return (
    <Routes>
      <Route index element={<PaymentsPage />} />
      <Route
        path="users/:paymentId"
        element={<PaymentUserPage />}
      />
    </Routes>
  )
}
