import { IoLogOut } from 'react-icons/io5'
import { useParams } from 'react-router-dom'

import { useAuthDefaultController } from '../../../auth/hooks/useAuthDefaultController'
import { Avatar } from '../Avatar'
import { AdminMenu } from './components/AdminMenu'
import { ClientMenu } from './components/ClientMenu'
import { useEffect, useRef, useState } from 'react'
import { BiMenu } from 'react-icons/bi'

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] =
    useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const { id } = useParams()

  useEffect(() => {
    if (screen.width > 768) {
      setShowSidebar(true)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node,
        ) &&
        screen.width < 768
      ) {
        setShowSidebar(false)
      }
    }
    document.addEventListener(
      'mousedown',
      handleClickOutside,
    )
    return () => {
      console.log('clean');
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )
    }
  }, [wrapperRef])

  const { authController } = useAuthDefaultController()

  const handleLogout = async () => {
    authController.logOut()
  }

  return (
    <>
      <div
        className={`w-full md:hidden py-3 px-3 bg-gray-50`}
      >
        <button
          className="flex justify-center items-center"
          onClick={() => setShowSidebar(true)}
        >
          <BiMenu size={32} className="text-black" />
        </button>
      </div>

      <aside
        className={`absolute top-0 z-20 w-3/4 h-full md:static lg:w-1/4 bg-menu ${
          showSidebar ? '' : 'hidden'
        }`}
        aria-label="Sidebar"
        ref={wrapperRef}
      >
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
    </>
  )
}
