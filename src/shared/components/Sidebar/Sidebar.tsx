import {
  IoLogOut
} from 'react-icons/io5'
import { useParams } from 'react-router-dom'

import { useAuthDefaultController } from '../../../auth/hooks/useAuthDefaultController'
import { Avatar } from '../Avatar'
import { AdminMenu } from './components/AdminMenu'
import { ClientMenu } from './components/ClientMenu'

export const Sidebar = () => {
  const { id } = useParams()

  const { authController } = useAuthDefaultController()

  const handleLogout = async () => {
    authController.logOut()
  }

  return (
    <aside className="w-1/4 bg-menu" aria-label="Sidebar">
      <div className="overflow-y-auto h-full py-4 px-3">
        <h2 className="font-bold text-xl text-center text-gray-200">
          FlexTo
        </h2>
        <Avatar />
        <ul className="space-y-2 py-2">
          <AdminMenu id={id} />
          <ClientMenu id={id} />

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
