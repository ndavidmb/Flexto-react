import {
  IoAccessibility,
  IoBuild,
  IoBusiness,
  IoCheckmarkDoneCircle,
  IoHandRightOutline,
  IoLogOut,
  IoMail,
  IoPeople,
} from 'react-icons/io5'
import { useSelector } from 'react-redux'
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { startLogout } from '../../store/slices/auth/thunks'
import { RootState } from '../../store/store'
import { MenuLink } from '../../styled-components/MenuLink'
import { Avatar } from '../Avatar'

// const removeEndOfRoute = (route: string) => {
//   const split = route.split('/')
//   return split.slice(0, split.length - 1).join('/')
// }

export const Sidebar = () => {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const { id } = useParams()

  // const location = useLocation()

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  // const route = removeEndOfRoute(location.pathname)

  const handleLogout = () => {
    dispatch(startLogout(theme?.id ?? ''))
    navigate(`/${theme?.id}/auth`)
  }

  return (
    <aside className="w-1/4 bg-menu" aria-label="Sidebar">
      <div className="overflow-y-auto h-full py-4 px-3">
        <h2 className="font-bold text-xl text-center text-gray-200">
          FlexTo
        </h2>
        <Avatar />
        <ul className="space-y-2 py-2">
          <MenuLink
            permissionsRole="admin"
            href={`/${id}/home/owners`}
          >
            <IoPeople className="text-xl" />
            Propietarios
          </MenuLink>
          <MenuLink
            permissionsRole="admin"
            href={`/${id}/home/apartments`}
          >
            <IoBusiness className="text-xl" />
            Apartamentos
          </MenuLink>
          <MenuLink
            permissionsRole="admin"
            href={`/${id}/home/states`}
          >
            <IoCheckmarkDoneCircle className="text-xl" />
            Estados
          </MenuLink>
          <MenuLink
            permissionsRole="admin"
            href={`/${id}/home/access-request`}
          >
            <IoHandRightOutline className="text-xl" />
            Solicitudes de acceso
          </MenuLink>
          <MenuLink
            permissionsRole="admin"
            href={`/${id}/home/custom`}
          >
            <IoBuild className="text-xl" />
            Personalizaci??n
          </MenuLink>

          <MenuLink
            permissionsRole="admin"
            href={`/${id}/home/act`}
          >
            <IoBuild className="text-xl" />
            Actas
          </MenuLink>

          <MenuLink
            permissionsRole="client"
            href={`/${id}/home/own-status`}
          >
            <IoAccessibility className="text-xl" />
            Estado
          </MenuLink>

          <MenuLink
            permissionsRole="client"
            href={`/${id}/home/request`}
          >
            <IoMail className="text-xl" />
            Enviar petici??n
          </MenuLink>

          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-2 p-2 text-base font-normal text-gray-400 rounded-lg bg-menu-item"
          >
            <IoLogOut className="text-xl" />
            Salir
          </button>
        </ul>
      </div>
    </aside>
  )
}
