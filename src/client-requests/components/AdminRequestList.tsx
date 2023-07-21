import { FC, useEffect, useState } from 'react'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { REQUEST_TYPE_DICT } from '../interfaces/client-request.interface'
import {
  AdminRequest,
  AdminRequestVm,
  REQUEST_STATES_DICT,
} from '../interfaces/request.interface'
import { AdminRequestActions } from './AdminRequestActions'
import { RequestStateParser } from './RequestStateParser'
import { HOURS_NUM_TO_STRING } from '../../public-spaces/constants/hours'

type Props = {
  adminRequests: AdminRequest[]
  handleDenyRequest: (request: AdminRequest) => void
  handleAcceptRequest: (request: AdminRequest) => void
  handleDelete: (request: AdminRequest) => void
}

export const AdminRequestList: FC<Props> = ({
  adminRequests,
  handleAcceptRequest,
  handleDenyRequest,
  handleDelete,
}) => {
  const [searchableRequests, setSearchableRequests] =
    useState<AdminRequestVm[]>([])

  const [allSearchableRequests, setAllSearchableRequests] =
    useState<AdminRequestVm[]>([])

  useEffect(() => {
    const searchableRequestsMap = adminRequests.map(
      (request) => ({
        ...request,
        username: request.user.displayName,
        email: request.user.email,
        phoneNumber: request.user.phoneNumber,
        state: REQUEST_STATES_DICT[request.approved],
        strType: REQUEST_TYPE_DICT[request.type],
      }),
    )

    setSearchableRequests(searchableRequestsMap)
    setAllSearchableRequests(searchableRequestsMap)
  }, [adminRequests])

  return (
    <DefaultContainerWithSearch
      searchOptions={{
        allItems: allSearchableRequests,
        setItems: setSearchableRequests,
        searchKeys: [
          'description',
          'email',
          'username',
          'phoneNumber',
          'strType',
          'state',
        ],
      }}
      title="Solicitudes"
    >
      <Table>
        <THead>
          <th className="w-32">Tipo</th>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Usuario</th>
          <th>Acciones</th>
        </THead>
        <tbody>
          {searchableRequests.map((request, index) => (
            <TRow index={index} key={request.id}>
              <td className="w-32">
                {REQUEST_TYPE_DICT[request.type]}
                <RequestStateParser
                  currentState={request.approved}
                />
              </td>
              <td>
                <p>{request.description}</p>
              </td>
              <td>
                <ul className='min-w-max'>
                  <li>
                    Solicitud del {request.dateDetail.date}
                  </li>
                  {request.dateDetail.startHour && (
                    <li>
                      Hora de inicio{' '}
                      {
                        // @ts-ignore
                        HOURS_NUM_TO_STRING[
                          request.dateDetail.startHour
                        ]
                      }
                    </li>
                  )}
                  {request.dateDetail.endHour && (
                    <li>
                      Hora de finalización{' '}
                      {
                        // @ts-ignore
                        HOURS_NUM_TO_STRING[
                          request.dateDetail.endHour
                        ]
                      }
                    </li>
                  )}
                </ul>
              </td>
              <td>
                <div className="flex flex-col">
                  {request.user.displayName}
                  <small className="text-sm flex flex-col text-gray-400">
                    {request.user.email} <br />
                    Cel. {request.user.phoneNumber}
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
