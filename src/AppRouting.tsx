import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { ApartmentWrapper } from './apartments/ApartmentWrapper'
import App from './App'
import { AuthWrapper } from './auth/AuthWrapper'
import { CustomizationWrapper } from './customizations/CustomizationWrapper'
import { OwnerWrapper } from './owners/OwnerWrapper'
import { NotFound } from './shared/components/NotFound'
import { StatesWrapper } from './states/StatesWrapper'

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="NotFound" element={<NotFound />} />
          <Route index element={<NotFound />} />
          <Route path=":id" element={<App />}>
            <Route
              path="apartments"
              element={<ApartmentWrapper />}
            />
            <Route
              path="owners"
              element={<OwnerWrapper />}
            />
            <Route
              path="states"
              element={<StatesWrapper />}
            />
            <Route
              path="custom"
              element={<CustomizationWrapper />}
            />
            <Route index element={<AuthWrapper />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
