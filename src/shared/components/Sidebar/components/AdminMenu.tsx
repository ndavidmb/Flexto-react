import { FC } from 'react'
import {
  IoBuild,
  IoBusiness,
  IoCheckmarkDoneCircle,
  IoHandRightOutline,
  IoPeople,
} from 'react-icons/io5'
import { MdOutlineBedroomParent } from 'react-icons/md'
import { UserRoles } from '../../../../auth/interfaces/user-roles.enums'
import { MenuLink } from '../../../styled-components/MenuLink'
import { TbBrandBooking } from 'react-icons/tb'

type Props = {
  id: string | undefined
}

export const AdminMenu: FC<Props> = ({ id }) => {
  return (
    <>
      <MenuLink
        permissionsRole={UserRoles.ADMIN}
        href={`/${id}/home/owners`}
      >
        <IoPeople className="text-xl" />
        Propietarios
      </MenuLink>
      <MenuLink
        permissionsRole={UserRoles.ADMIN}
        href={`/${id}/home/apartments`}
      >
        <IoBusiness className="text-xl" />
        Apartamentos
      </MenuLink>
      <MenuLink
        permissionsRole={UserRoles.ADMIN}
        href={`/${id}/home/states`}
      >
        <IoCheckmarkDoneCircle className="text-xl" />
        Estados
      </MenuLink>
      <MenuLink
        permissionsRole={UserRoles.ADMIN}
        href={`/${id}/home/admin-request`}
      >
        <IoHandRightOutline className="text-xl" />
        Solicitudes
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.ADMIN}
        href={`/${id}/home/act`}
      >
        <IoBuild className="text-xl" />
        Actas
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.ADMIN}
        href={`/${id}/home/public-spaces`}
      >
        <MdOutlineBedroomParent className="text-xl" />
        Espacios públicos
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.ADMIN}
        href={`/${id}/home/booking/admin`}
      >
        <TbBrandBooking className="text-xl" />
        Reservas
      </MenuLink>
    </>
  )
}
