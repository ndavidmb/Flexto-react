import { EditProfile } from '../../profiles/components/EditProfile'
import { useModal } from '../hooks/useModal'
import { useAppSelector } from '../store/hooks'
import { ModalContainer } from './Modal/Modal'
import { FaUser } from 'react-icons/fa'

export const Avatar = () => {
  const { closeModal, isOpen, openModal } = useModal()
  const authState = useAppSelector(
    (state) => state.authState,
  )

  return (
    <>
      {isOpen && (
        <ModalContainer
          close={closeModal}
          title="Editar perfil"
        >
          <EditProfile
            closeModal={closeModal}
            authState={authState}
          ></EditProfile>
        </ModalContainer>
      )}
      <div
        onClick={openModal}
        title="Editar perfil"
        className="flex items-center justify-center p-5 cursor-pointer"
      >
        <div
          className={`rounded-full p-1 h-24 w-24 gap-2 border flex items-center justify-center ${
            !authState.photoUrl && 'bg-menu-dark'
          }`}
        >
          {authState.photoUrl ? (
            <img
              src={authState.photoUrl}
              className="object-cover rounded-full !h-full w-full"
              alt="avatar"
            />
          ) : (
            <FaUser color="#fff" size={80} />
          )}
        </div>
        <h3 className="text-white flex flex-col text-center font-semibold w-[165px]">
          {authState.displayName}
          <small className="font-normal text-gray-400">
            {authState.email}
          </small>
        </h3>
      </div>
    </>
  )
}
