import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { RootState } from '../../shared/store/store'
import { ClientRequestList } from '../components/ClientRequestList'
import { useRequestClientViewController } from '../controllers/request-client.view.controller'
import { AdminRequest } from '../interfaces/request.interface'

export const ClientRequestPage = () => {
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

  return (
    <DefaultContainerWithSearch
      title="Solicitudes"
      actionName="Crear solicitud"
      action={() => {
        console.log('open modal')
      }}
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
  )
}
