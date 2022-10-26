import { FC, lazy, ReactNode, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ActWrapper } from '../act/ActWrapper'
import { ApartmentWrapper } from '../apartments/ApartmentWrapper'
import { AccessRequest } from '../client-requests/components/AccessRequest'
import { CustomizationWrapper } from '../customizations/CustomizationWrapper'
import { OwnerDetail } from '../owners/components/OwnerDetail'
import { OwnerWrapper } from '../owners/OwnerWrapper'
import { LoadingSvg } from '../shared/components/Loading/Loading'
import { StateWrapper } from '../states/StatesWrapper'
import { ProtectedRouter } from './ProtectedRouter'

const ClientRequestsWrapper = lazy(
  () => import('../client-requests/ClientRequestsWrapper'),
)

const LazyRoute: FC<{
  children: ReactNode
}> = ({ children }) => (
  <Suspense fallback={<LoadingSvg />}>{children}</Suspense>
)

const HomeRouter = () => {
  return (
    <ProtectedRouter>
      <Routes>
        <Route
          path="apartments"
          element={<ApartmentWrapper />}
        />
        <Route path="owners" element={<OwnerWrapper />} />
        <Route path="states" element={<StateWrapper />} />
        <Route
          path="owner-detail"
          element={<OwnerDetail />}
        />
        <Route
          path="access-request"
          element={<AccessRequest />}
        />
        <Route
          path="custom"
          element={<CustomizationWrapper />}
        />
        <Route
          path="request"
          element={
            <LazyRoute>
              <ClientRequestsWrapper />
            </LazyRoute>
          }
        />
        <Route
          path="act"
          element={
            <LazyRoute>
              <ActWrapper />
            </LazyRoute>
          }
        />
      </Routes>
    </ProtectedRouter>
  )
}

export default HomeRouter
