import { FC } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { IoMail } from 'react-icons/io5'
import { TbBrandBooking } from 'react-icons/tb'
import { UserRoles } from '../../../../auth/interfaces/user-roles.enums'
import { MenuLink } from '../../../styled-components/MenuLink'
import { MdOutlinePayments } from 'react-icons/md'
import { SiReadthedocs } from 'react-icons/si'

type Props = {
  id: string | undefined
}

export const ClientMenu: FC<Props> = ({ id }) => {
  return (
    <>
      <MenuLink
        permissionsRole={UserRoles.CLIENT}
        href={`/${id}/home/apartment`}
      >
        <AiOutlineHome className="text-xl" />
        Unidad residencial
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.CLIENT}
        href={`/${id}/home/payments`}
      >
        <MdOutlinePayments className="text-xl" />
        Servicios
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.CLIENT}
        href={`/${id}/home/request`}
      >
        <IoMail className="text-xl" />
        Enviar solicitud
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.CLIENT}
        href={`/${id}/home/booking`}
      >
        <TbBrandBooking className="text-xl" />
        Reservas
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.CLIENT}
        href={`/${id}/home/act`}
      >
        <SiReadthedocs className="text-xl" />
        Actas y Documentos
      </MenuLink>
    </>
  )
}
