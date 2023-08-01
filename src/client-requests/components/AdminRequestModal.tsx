import { FC } from 'react'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { RequestType } from '../interfaces/client-request.interface'
import { AdminRequestConnectOwnerForm } from './AdminRequestConnectOwnerForm'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { useRequestViewController } from '../controllers/request.view.controller'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'

type Props = {
  data: AdminRequest
  closeModal: (refresh?: boolean) => void
  refreshState: (
    requestId: string,
    newState: RequestStates,
  ) => void
}

export const AdminRequestModal: FC<Props> = ({
  closeModal,
  refreshState,
  data,
}) => {
  const requestViewController = useRequestViewController()

  const handleCloseModal = (apartment?: Apartment) => {
    if (!apartment) {
      closeModal()
      return
    }

    requestViewController
      .acceptAccessRequest(apartment, data)
      .then((successfully) => {
        if (successfully) {
          refreshState(data.id!, RequestStates.ACCEPTED)
        }
      })
      .finally(() => closeModal())
  }

  return (
    <ModalContainer
      close={closeModal}
      title="Vincular unidad residencial"
    >
      <AdminRequestConnectOwnerForm
        closeModal={handleCloseModal}
      />
    </ModalContainer>
  )
}
