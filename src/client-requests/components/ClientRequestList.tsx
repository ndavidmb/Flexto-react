import { FC } from 'react'
import { THead } from '../../shared/styled-components/THead'
import { Table } from '../../shared/styled-components/Table'
import {
  AdminRequest,
  REQUEST_STATES_DICT,
  RequestStates,
} from '../interfaces/request.interface'
import { TRow } from '../../shared/styled-components/TRow'
import { Button } from '../../shared/styled-components/Button'
import { REQUEST_TYPE_DICT } from '../interfaces/client-request.interface'
import { RequestStateParser } from './RequestStateParser'
import { HOURS_NUM_TO_STRING } from '../../public-spaces/constants/hours'

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
            <td className="flex gap-2">
              {request.approved ===
              RequestStates.PENDING ? (
                <Button
                  color="primary"
                  onClick={() => cancelRequest(request)}
                >
                  Cancelar solicitud
                </Button>
              ) : (
                <p>Su solicitud ya fue procesada</p>
              )}
            </td>
          </TRow>
        ))}
      </tbody>
    </Table>
  )
}
