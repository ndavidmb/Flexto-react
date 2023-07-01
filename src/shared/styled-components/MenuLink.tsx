import { ReactNode, FC } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../store/store'
import { UserRoles } from '../../auth/interfaces/user-roles.enums'

type Props = {
  href: string
  children: ReactNode
  permissionsRole: UserRoles
}

export const MenuLink: FC<Props> = ({
  children,
  href,
  permissionsRole,
}) => {
  const { role } = useSelector(
    (state: RootState) => state.authState,
  )

  return role === permissionsRole ? (
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
  ) : (
    <></>
  )
}
