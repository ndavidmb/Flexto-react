import { EditProfile } from '../../profiles/components/EditProfile'
import { useModal } from '../hooks/useModal'
import { useAppSelector } from '../store/hooks'
import { ModalContainer } from './Modal/Modal'

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
        title='Editar perfil'
        className="flex flex-col items-center justify-center p-5 cursor-pointer"
      >
        <div className="rounded-full p-1 h-32 w-32 border flex items-center justify-center">
          <img
            src={authState.photoUrl || undefined}
            className="object-cover rounded-full !h-full w-full"
            alt="avatar"
          />
        </div>
        <h3 className="text-white flex flex-col text-center font-semibold pt-2">
          {authState.displayName}
          <small className="font-normal text-gray-400">
            {authState.email}
          </small>
        </h3>
      </div>
    </>
  )
}
