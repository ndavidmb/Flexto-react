import { FC } from 'react'
import { AiFillStar } from 'react-icons/ai'
import {
  IoBusiness,
  IoHandRightOutline,
  IoPeople,
} from 'react-icons/io5'
import {
  MdOutlineBedroomParent,
  MdOutlinePayments,
} from 'react-icons/md'
import { SiReadthedocs } from 'react-icons/si'
import { TbBrandBooking } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { UserRoles } from '../../../../auth/interfaces/user-roles.enums'
import { RootState } from '../../../store/store'
import { MenuLink } from '../../../styled-components/MenuLink'

type Props = {
  id: string | undefined
}

export const AdminMenu: FC<Props> = ({ id }) => {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

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
        href={`/${id}/home/payments`}
      >
        <MdOutlinePayments className="text-xl" />
        Servicios
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.ADMIN}
        href={`/${id}/home/apartments`}
      >
        <IoBusiness className="text-xl" />
        Unidades residenciales
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
        href={`/${id}/home/act/admin/*`}
      >
        <SiReadthedocs className="text-xl" />
        Actas y Documentos
      </MenuLink>

      <MenuLink
        permissionsRole={UserRoles.ADMIN}
        href={`/${id}/home/public-spaces`}
      >
        <MdOutlineBedroomParent className="text-xl" />
        Zonas comunes
      </MenuLink>

      {theme.premium && (
        <MenuLink
          permissionsRole={UserRoles.ADMIN}
          href={`/${id}/home/booking/admin`}
        >
          <div className="w-full flex justify-between">
            <span className="flex items-center justify-items-start">
              <TbBrandBooking className="text-xl" />
              Reservas
            </span>

            <span className='text-xs flex items-center gap-1 bg-yellow-500 text-white rounded px-2'>
              <AiFillStar />
              premium
            </span>
          </div>
        </MenuLink>
      )}
    </>
  )
}
