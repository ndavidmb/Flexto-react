import { FC, lazy, ReactNode, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ApartmentWrapper } from '../apartments/ApartmentWrapper'
import { CustomizationWrapper } from '../customizations/CustomizationWrapper'
import { OwnerWrapper } from '../owners/OwnerWrapper'
import { LoadingSvg } from '../shared/components/Loading/Loading'
import { ProtectedRouter } from './ProtectedRouter'
import { StatesWrapper } from '../states/StatesWrapper'
import { ActWrapper } from '../act/ActWrapper'

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
        <Route path="states" element={<StatesWrapper />} />
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
        <Route
          path="*"
          element={<Navigate to="/NotFound" replace />}
        />
      </Routes>
    </ProtectedRouter>
  )
}

export default HomeRouter
