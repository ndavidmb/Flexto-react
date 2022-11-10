import { FC, ReactNode, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ActWrapper } from '../act/ActWrapper'
import { ApartmentWrapper } from '../apartments/ApartmentWrapper'
import { AccessRequest } from '../client-requests/components/AccessRequest'
import { CustomizationWrapper } from '../customizations/CustomizationWrapper'
import { OwnerDetail } from '../owners/components/OwnerDetail'
import { OwnerWrapper } from '../owners/OwnerWrapper'
import { LoadingSvg } from '../shared/components/Loading/Loading'
import { StateWrapper } from '../states/StatesWrapper'

const LazyRoute: FC<{
  children: ReactNode
}> = ({ children }) => (
  <Suspense fallback={<LoadingSvg />}>{children}</Suspense>
)

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

      <Route
        path="act"
        element={
          <LazyRoute>
            <ActWrapper />
          </LazyRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/NotFound" replace />}
      />
    </Routes>
  )
}
