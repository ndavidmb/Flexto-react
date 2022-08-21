import {
  IoBuild,
  IoBusiness,
  IoCheckmarkDoneCircle,
  IoLogOut,
  IoPeople,
} from 'react-icons/io5'
import { useLocation } from 'react-router-dom'
import { MenuLink } from '../../styled-components/MenuLink'

const removeEndOfRoute = (route: string) => {
  const split = route.split('/')
  return split.slice(0, split.length - 1).join('/')
}

export const Sidebar = () => {
  const location = useLocation()

  const route = removeEndOfRoute(location.pathname)

  return (
    <aside className="w-1/4 bg-menu" aria-label="Sidebar">
      <div className="overflow-y-auto h-full py-4 px-3">
        <h2 className="font-bold text-2xl pl-3 pb-2 border-b border-gray-600 text-gray-200">
          FlexTo
        </h2>
        <ul className="space-y-2 py-2">
          <MenuLink href={`${route}/owners`}>
            <IoPeople className="text-xl" />
            Propietarios
          </MenuLink>
          <MenuLink href={`${route}/apartments`}>
            <IoBusiness className="text-xl" />
            Apartamentos
          </MenuLink>
          <MenuLink href={`${route}/states`}>
            <IoCheckmarkDoneCircle className="text-xl" />
            Estados
          </MenuLink>
          <MenuLink href={`${route}/custom`}>
            <IoBuild className="text-xl" />
            Personalización
          </MenuLink>
          <MenuLink href={`${route}/`}>
            <IoLogOut className="text-xl" />
            Salir
          </MenuLink>
        </ul>
      </div>
    </aside>
  )
}
