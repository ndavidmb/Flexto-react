import { Navigate, Route, Routes } from 'react-router-dom'
import { ActWrapper } from './ActWrapper'
import { ActTemplatesEditor } from './pages/ActTemplatesEditor'
import { ActDynamicPage } from './pages/ActDynamicPage'
import { FirestoreTable } from '../shared/constants/firestore-tables'

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
          element={
            <ActDynamicPage actType={FirestoreTable.ACT} labelsName='acta' />
          }
        />
        <Route
          path={ACT_ROUTES.templates}
          element={
            <ActDynamicPage
              actType={FirestoreTable.ACT_TEMPLATES}
              labelsName='plantilla'
            />
          }
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
