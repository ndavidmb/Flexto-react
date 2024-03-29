import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { useModal } from '../../shared/hooks/useModal'
import { RootState } from '../../shared/store/store'
import { ClientRequestForm } from '../components/ClientRequestForm'
import { ClientRequestList } from '../components/ClientRequestList'
import { useRequestClientViewController } from '../controllers/request-client.view.controller'
import { AdminRequest } from '../interfaces/request.interface'
import { useRequestViewController } from '../controllers/request.view.controller'

export const ClientRequestPage = () => {
  const { closeModal, openModal, isOpen } = useModal()
  const [requestStates, setRequestStates] = useState<
    AdminRequest[]
  >([])
  const [requestAllStates, setRequestAllStates] = useState<
    AdminRequest[]
  >([])

  const requestAdminViewController =
    useRequestViewController()
  const requestClientViewController =
    useRequestClientViewController()
  const user = useSelector(
    (state: RootState) => state.authState,
  )

  useEffect(() => {
    consultData()
  }, [])

  const consultData = () => {
    requestClientViewController
      .getOwnerRequest(user.uid)
      .then((users) => {
        setRequestStates(users)
        setRequestAllStates(users)
      })
  }

  const handleClose = (refresh?: boolean) => {
    if (refresh) {
      consultData()
    }
    closeModal()
  }

  const handleDeleteRequest = (request: AdminRequest) => {
    requestAdminViewController
      .deleteRequest(request)
      .then((successfully) => {
        if (successfully) {
          consultData()
        }
      })
  }

  return (
    <>
      {isOpen && (
        <ModalContainer
          close={closeModal}
          title="Crear solicitud"
        >
          <ClientRequestForm closeModal={handleClose} />
        </ModalContainer>
      )}
      <DefaultContainerWithSearch
        title="Solicitudes"
        actionName="Crear solicitud"
        action={openModal}
        searchOptions={{
          allItems: requestAllStates,
          searchKeys: ['description'],
          setItems: setRequestStates,
        }}
      >
        <ClientRequestList
          requests={requestStates}
          cancelRequest={(request) =>
            handleDeleteRequest(request)
          }
        />
      </DefaultContainerWithSearch>
    </>
  )
}
