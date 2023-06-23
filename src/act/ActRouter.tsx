import { Navigate, Route, Routes } from 'react-router-dom'
import { ActList } from './pages/ActList'
import { ActWrapper } from './ActWrapper'
import { ActTemplatesEditor } from './pages/ActTemplatesEditor'
import { ActTemplatesWrapper } from './pages/ActTemplatesWrapper'

export const enum ACT_ROUTES {
  list = 'act-list',
  templates = 'act-templates',
  templatesDeprecated = 'act-templates-deprecated',
}

export const ActRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<ActWrapper />}>
        <Route
          path={ACT_ROUTES.list}
          element={<ActList />}
        />
        <Route
          path={ACT_ROUTES.templates}
          element={<ActTemplatesWrapper />}
        />
        <Route
          path={ACT_ROUTES.templatesDeprecated}
          element={<ActTemplatesEditor />}
        />
        <Route
          path="*"
          element={<Navigate to={ACT_ROUTES.list} />}
        />
      </Route>
    </Routes>
  )
}
