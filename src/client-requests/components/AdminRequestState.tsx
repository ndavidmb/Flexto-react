import { FC } from 'react'
import { RequestStates } from '../interfaces/request.interface'

type Props = { currentState: RequestStates }

export const AdminRequestState: FC<Props> = ({
  currentState,
}) => {
  if (currentState === RequestStates.PENDING) {
    return (
      <div className="font-bold text-primary">
        Pendiente
      </div>
    )
  }
  return (
    currentState === RequestStates.ACCEPTED ?
    <div className="font-bold">
      Aceptado
    </div> :
    <div className="font-bold">
    Rechazado
  </div>
  )
}
