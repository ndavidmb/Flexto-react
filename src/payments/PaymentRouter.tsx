import { Route, Routes } from 'react-router-dom'
import { PaymentsPage } from './pages/PaymentsPage'

export const PaymentRouter = () => {
  return (
    <Routes>
      <Route index element={<PaymentsPage />} />
    </Routes>
  )
}
