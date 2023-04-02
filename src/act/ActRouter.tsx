import { Navigate, Route, Routes } from 'react-router-dom'
import { ActList } from './pages/ActList'
import { ActWrapper } from './ActWrapper'
import { ActTemplatesList } from './pages/ActTemplatesList'

export const enum ACT_ROUTES {
  list = 'act-list',
  templates = 'act-templates',
}

export const ActRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<ActWrapper />}>
        <Route path={ACT_ROUTES.list} element={<ActList />} />
        <Route
          path={ACT_ROUTES.templates}
          element={<ActTemplatesList />}
        />
        <Route
          path="*"
          element={<Navigate to={ACT_ROUTES.list}/>}
        />
      </Route>
    </Routes>
  )
}
