import { Navigate, Route, Routes } from 'react-router-dom'
import { ActRouter } from '../act/ActRouter'
import { ApartmentWrapper } from '../apartments/pages/ApartmentWrapper'
import { AdminRequestPage } from '../client-requests/pages/AdminRequestPage'
import { CustomizationWrapper } from '../customizations/CustomizationWrapper'
import { OwnerPage } from '../owners/pages/OwnerPage'
import { OwnerDetailPage } from '../owners/pages/OwnerDetailPage'
import { PublicSpacesPage } from '../public-spaces/pages/PublicSpacesPage'
import { StateWrapper } from '../states/StatesWrapper'
import { BookingRouter } from '../booking/BookingRouter'
import { PaymentRouter } from '../payments/PaymentRouter'

export const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="apartments"
        element={<ApartmentWrapper />}
      />

      <Route path="owners" element={<OwnerPage />}>
        <Route
          path=":ownerId"
          element={<OwnerDetailPage />}
        />
      </Route>

      <Route path="states" element={<StateWrapper />} />
      <Route
        path="public-spaces"
        element={<PublicSpacesPage />}
      />

      <Route
        path="admin-request"
        element={<AdminRequestPage />}
      />
      <Route
        path="custom"
        element={<CustomizationWrapper />}
      />

      <Route path="act/*" element={<ActRouter />}></Route>
      <Route
        path="payments/*"
        element={<PaymentRouter />}
      ></Route>

      <Route path="booking/*" element={<BookingRouter />} />

      <Route
        path="*"
        element={<Navigate to="/NotFound" replace />}
      />
    </Routes>
  )
}
