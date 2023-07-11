import { FC, useState } from 'react'
import { Select } from '../../shared/styled-components/Select'
import {
  REQUEST_TYPE_DICT,
  RequestType,
} from '../interfaces/client-request.interface'
import { Label } from '../../shared/styled-components/Label'
import { ClientRequestPublicSpaceForm } from './ClientRequestPublicSpaceForm'

type Props = {
  closeModal: (refresh?: boolean) => void
}

export const ClientRequestForm: FC<Props> = ({
  closeModal,
}) => {
  const [requestType, setRequestType] = useState(1)

  return (
    <>
      <div className="flex flex-col w-full">
        <Label htmlFor="type">Tipo de solicitud</Label>
        <Select
          allowUndefined={false}
          id="type"
          onChange={(el) =>
            setRequestType(Number(el.currentTarget.value))
          }
          value={requestType}
        >
          <option value={RequestType.ACT}>
            {REQUEST_TYPE_DICT[RequestType.ACT]}
          </option>
          <option value={RequestType.PUBLIC_SPACE}>
            {REQUEST_TYPE_DICT[RequestType.PUBLIC_SPACE]}
          </option>
        </Select>
      </div>
      {requestType === RequestType.ACT ? (
        // TODO: Agregar formulario del acta
        <div>Lógica de acta</div>
      ) : (
        <ClientRequestPublicSpaceForm
          handleClose={closeModal}
        />
      )}
    </>
  )
}
