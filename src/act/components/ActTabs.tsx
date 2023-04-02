import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  tabs: {
    label: string
    redirectTo: string
  }[]
}

const TAB_TYPE = {
  active:
    'inline-block p-4 text-primary border-b-2 border-primary rounded-t-lg active',
  inactive:
    'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300',
}

export const ActTabs: FC<Props> = ({ tabs }) => {
  return (
    <div className="text-sm h-14 font-medium text-center text-gray-500 border-b border-gray-200">
      <ul className="flex flex-wrap">
        {tabs.map((tab, index) => (
          <li className="mr-2" key={index}>
            <NavLink
              to={tab.redirectTo}
              aria-current="page"
              className={({ isActive }) =>
                isActive
                  ? TAB_TYPE.active
                  : TAB_TYPE.inactive
              }
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
