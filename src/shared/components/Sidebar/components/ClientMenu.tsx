import { FC } from 'react'
import { IoAccessibility, IoMail } from 'react-icons/io5'
import { UserRoles } from '../../../../auth/interfaces/user-roles.enums'
import { MenuLink } from '../../../styled-components/MenuLink'

type Props = {
  id: string | undefined
}

export const ClientMenu: FC<Props> = ({ id }) => {
  return (
    <>
      <MenuLink
        permissionsRole={UserRoles.CLIENT}
        href={`/${id}/home/own-status`}
      >
        <IoAccessibility className="text-xl" />
        Estado
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.CLIENT}
        href={`/${id}/home/request`}
      >
        <IoMail className="text-xl" />
        Enviar petición
      </MenuLink>
    </>
  )
}
