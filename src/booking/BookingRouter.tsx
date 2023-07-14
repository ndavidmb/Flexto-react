import { Route, Routes } from 'react-router-dom'
import { BookingPage } from './pages/BookingPage'
import { BookingAdminPage } from './pages/BookingAdminPage'

export const BookingRouter = () => {
  return (
    <Routes>
      <Route index element={<BookingPage />} />
      <Route path="admin" element={<BookingAdminPage />} />
    </Routes>
  )
}
