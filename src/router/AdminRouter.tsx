import { Navigate, Route, Routes } from 'react-router-dom'
import { ActList } from '../act/pages/ActList'
import { ActWrapper } from '../act/ActWrapper'
import { ApartmentWrapper } from '../apartments/ApartmentWrapper'
import { AccessRequest } from '../client-requests/components/AccessRequest'
import { CustomizationWrapper } from '../customizations/CustomizationWrapper'
import { OwnerWrapper } from '../owners/OwnerWrapper'
import { OwnerDetail } from '../owners/components/OwnerDetail'
import { StateWrapper } from '../states/StatesWrapper'
import { ActRouter } from '../act/ActRouter'

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
        path="access-request"
        element={<AccessRequest />}
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
