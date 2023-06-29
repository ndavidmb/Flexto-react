import { FC } from 'react'
import { Button } from '../../shared/styled-components/Button'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'

type Props = {
  request: AdminRequest
  handleDenyRequest: (request: AdminRequest) => void
  handleAcceptRequest: (request: AdminRequest) => void
  handleDelete: (request: AdminRequest) => void
}

export const AdminRequestActions: FC<Props> = ({
  request,
  handleAcceptRequest,
  handleDenyRequest,
  handleDelete,
}) => {
  if (request.approved === RequestStates.PENDING) {
    return (
      <div className="flex gap-2">
        <Button
          onClick={() => handleAcceptRequest(request)}
          color="primary"
        >
          Aceptar
        </Button>
        <Button
          onClick={() => handleDenyRequest(request)}
          color="secondary"
        >
          Rechazar
        </Button>
      </div>
    )
  }

  return (
    <Button
      color="primary"
      onClick={() => handleDelete(request)}
    >
      Eliminar
    </Button>
  )
}
