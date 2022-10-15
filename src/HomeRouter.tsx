import { Navigate, Route, Routes } from 'react-router-dom'
import { ApartmentWrapper } from './apartments/ApartmentWrapper'
import { CustomizationWrapper } from './customizations/CustomizationWrapper'
import { OwnerWrapper } from './owners/OwnerWrapper'
import { ProtectedRouter } from './shared/components/ProtectedRouter'
import { StatesWrapper } from './states/StatesWrapper'

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
          path="*"
          element={<Navigate to="/NotFound" replace />}
        />
      </Routes>
    </ProtectedRouter>
  )
}

export default HomeRouter
