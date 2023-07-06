import { FC } from 'react'
import { THead } from '../../shared/styled-components/THead'
import { Table } from '../../shared/styled-components/Table'
import { AdminRequest } from '../interfaces/request.interface'
import { TRow } from '../../shared/styled-components/TRow'
import { Button } from '../../shared/styled-components/Button'
import { REQUEST_TYPE_DICT } from '../interfaces/client-request.interface'
import { RequestStateParser } from './RequestStateParser'

type Props = {
  requests: AdminRequest[]
  cancelRequest: (request: AdminRequest) => void
}

export const ClientRequestList: FC<Props> = ({
  requests,
  cancelRequest,
}) => {
  return (
    <Table>
      <THead>
        <th scope="col">Tipo</th>
        <th scope="col">Descripción</th>
        <th scope="col">Fecha</th>
        <th scope="col">Acción</th>
      </THead>
      <tbody>
        {requests.map((request, index) => (
          <TRow index={index} key={request.id}>
            <th
              scope="row"
              className="font-medium text-gray-900 whitespace-nowrap"
            >
              {REQUEST_TYPE_DICT[request.type]}
              <RequestStateParser
                currentState={request.approved}
              />
            </th>
            <td>{request.description}</td>
            <td>
              <ul>
                <li>
                  Solicitud del {request.dateDetail.date}
                </li>
                {request.dateDetail.startHour && (
                  <li>
                    Hora de inicio{' '}
                    {request.dateDetail.startHour}
                  </li>
                )}
                {request.dateDetail.endHour && (
                  <li>
                    Hora de inicio{' '}
                    {request.dateDetail.endHour}
                  </li>
                )}
              </ul>
            </td>
            <td className="flex gap-2">
              <Button
                color="primary"
                onClick={() => cancelRequest(request)}
              >
                Cancelar solicitud
              </Button>
            </td>
          </TRow>
        ))}
      </tbody>
    </Table>
  )
}
