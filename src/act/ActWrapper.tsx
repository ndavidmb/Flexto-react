import { Outlet } from 'react-router-dom'
import { DefaultContainer } from '../shared/components/DefaultContainer/DefaultContainer'
import { Tabs } from '../shared/components/Tabs'
import { ACT_ROUTES } from './ActRouter'

export const ActWrapper = () => {
  return (
    <DefaultContainer>
      <Tabs
        tabs={[
          {
            label: 'Actas',
            redirectTo: ACT_ROUTES.list,
          },
          {
            label: 'Plantillas',
            redirectTo: ACT_ROUTES.templates,
          },
        ]}
      />
      <div className="px-4 h-[calc(100%-4.5rem)] py-2">
        <Outlet />
      </div>
    </DefaultContainer>
  )
}
