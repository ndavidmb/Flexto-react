import { AiOutlineWarning } from 'react-icons/ai'
import { Button } from '../../shared/styled-components/Button'
import { useAuthDefaultController } from '../hooks/auth-theme.controller'

export const AuthWaitApproved = () => {
  const { authController } = useAuthDefaultController()

  const handleLogout = () => {
    authController.logOut()
  }

  return (
    <section className="flex flex-col gap-4 justify-center items-center bg-gray-100 w-full h-screen">
      <div className="bg-white w-[560px] text-center flex flex-col p-8 gap-2 rounded shadow">
        <h2 className="font-semibold text-2xl flex flex-col justify-center items-center mb-1">
          <AiOutlineWarning
            className="text-primary"
            size={50}
          />
          Solicitud de acceso pendiente
        </h2>
        <p className="text-gray-500 font-light text-lg mb-4">
          No se ha aprobado su solicitud de acceso al sitio
          web por favor intente más tarde.
        </p>
        <div className="flex justify-center gap-2">
          <Button color="primary" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </section>
  )
}
