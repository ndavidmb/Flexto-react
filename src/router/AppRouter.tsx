import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { App } from '../App'
import { NotFound } from '../shared/components/NotFound'
import { HomeRouter } from './HomeRouter'
import { PublicRouter } from './PublicRouter'

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="NotFound" element={<NotFound />} />
        <Route path=":id" element={<App />}>
          <Route path="home/*" element={<HomeRouter />} />
          <Route path="auth/*" element={<PublicRouter />} />
          <Route
            index
            element={<Navigate to="auth" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
