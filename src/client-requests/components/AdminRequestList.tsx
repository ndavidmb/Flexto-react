import { Dispatch, FC, SetStateAction } from 'react'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { REQUEST_TYPE_DICT } from '../interfaces/client-request.interface'
import { AdminRequest } from '../interfaces/request.interface'
import { AdminRequestActions } from './AdminRequestActions'
import { AdminRequestState } from './AdminRequestState'

type Props = {
  adminRequests: AdminRequest[]
  setAdminRequests: Dispatch<SetStateAction<AdminRequest[]>>
  handleDenyRequest: (request: AdminRequest) => void
  handleAcceptRequest: (request: AdminRequest) => void
  handleDelete: (request: AdminRequest) => void
}

export const AdminRequestList: FC<Props> = ({
  adminRequests,
  setAdminRequests,
  handleAcceptRequest,
  handleDenyRequest,
  handleDelete,
}) => {
  return (
    <DefaultContainerWithSearch
      searchOptions={{
        allItems: adminRequests,
        setItems: setAdminRequests,
        searchKeys: ['description'],
      }}
      title="Solicitudes de acceso"
    >
      <Table>
        <THead>
          <th className="w-32">Tipo</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Usuario</th>
          <th>Acciones</th>
        </THead>
        <tbody>
          {adminRequests.map((request, index) => (
            <TRow index={index} key={request.id}>
              <td className="w-32">
                {REQUEST_TYPE_DICT[request.type]}
              </td>
              <td>
                <p>{request.description}</p>
                <span className='text-xs'>
                  Fecha: {request.dateDetail.date}
                </span>
              </td>
              <td>
                <AdminRequestState
                  currentState={request.approved}
                />
              </td>
              <td>
                <div className="flex flex-col">
                  {request.user.displayName}
                  <small className="text-sm text-gray-400">
                    {request.user.email}
                  </small>
                </div>
              </td>
              <td>
                <AdminRequestActions
                  handleAcceptRequest={handleAcceptRequest}
                  handleDenyRequest={handleDenyRequest}
                  handleDelete={handleDelete}
                  request={request}
                />
              </td>
            </TRow>
          ))}
        </tbody>
      </Table>
    </DefaultContainerWithSearch>
  )
}
