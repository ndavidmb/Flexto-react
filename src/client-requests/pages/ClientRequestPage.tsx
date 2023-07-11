import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { RootState } from '../../shared/store/store'
import { ClientRequestList } from '../components/ClientRequestList'
import { useRequestClientViewController } from '../controllers/request-client.view.controller'
import { AdminRequest } from '../interfaces/request.interface'
import { useModal } from '../../shared/hooks/useModal'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { ClientRequestPublicSpaceForm } from '../components/ClientRequestPublicSpaceForm'
import { ClientRequestForm } from '../components/ClientRequestForm'

export const ClientRequestPage = () => {
  const { closeModal, openModal, setData, data, isOpen } =
    useModal()
  const [requestStates, setRequestStates] = useState<
    AdminRequest[]
  >([])
  const [requestAllStates, setRequestAllStates] = useState<
    AdminRequest[]
  >([])

  const requestClientViewController =
    useRequestClientViewController()
  const user = useSelector(
    (state: RootState) => state.authState,
  )

  useEffect(() => {
    requestClientViewController
      .getOwnerRequest(user.uid)
      .then((users) => {
        setRequestStates(users)
        setRequestAllStates(users)
      })
  }, [])

  const handleClose = (refresh?: boolean) => {
    closeModal()
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
          cancelRequest={() => {
            console.log('canceled')
          }}
        />
      </DefaultContainerWithSearch>
    </>
  )
}
