import { ReactNode, FC } from 'react'
import { NavLink } from 'react-router-dom'

type Props = {
  href: string
  children: ReactNode
}

export const MenuLink: FC<Props> = ({ children, href }) => {
  return (
    <li>
      <NavLink
        to={href}
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 text-base font-normal text-gray-400 rounded-lg bg-menu-item ${
            isActive ? 'bg-menu-dark text-white' : ''
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  )
}
