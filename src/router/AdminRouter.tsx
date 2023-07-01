import { Navigate, Route, Routes } from 'react-router-dom'
import { ActRouter } from '../act/ActRouter'
import { ApartmentWrapper } from '../apartments/ApartmentWrapper'
import { AdminRequestPage } from '../client-requests/pages/AdminRequestPage'
import { CustomizationWrapper } from '../customizations/CustomizationWrapper'
import { OwnerWrapper } from '../owners/OwnerWrapper'
import { OwnerDetail } from '../owners/components/OwnerDetail'
import { StateWrapper } from '../states/StatesWrapper'

export const AdminRouter = () => {
  return (
    <Routes>
      <Route
        path="apartments"
        element={<ApartmentWrapper />}
      />

      <Route path="owners" element={<OwnerWrapper />}>
        <Route path=":ownerId" element={<OwnerDetail />} />
      </Route>

      <Route path="states" element={<StateWrapper />} />

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
        path="*"
        element={<Navigate to="/NotFound" replace />}
      />
    </Routes>
  )
}
