import { FC, useState } from 'react'
import { Select } from '../../shared/styled-components/Select'
import {
  REQUEST_TYPE_DICT,
  RequestType,
} from '../interfaces/client-request.interface'
import { Label } from '../../shared/styled-components/Label'
<<<<<<< HEAD
import { ClientRequestStateForm } from './ClientRequestStateForm'
import { ClientRequestRecordForm } from './ClientRequestRecordForm'
=======
import { ClientRequestPublicSpaceForm } from './ClientRequestPublicSpaceForm'
>>>>>>> 4c7cd4f436c5fe2f0600811a0cf05c183a629483

type Props = {
  closeModal: (refresh?: boolean) => void
}

export const ClientRequestForm: FC<Props> = ({
  closeModal,
}) => {
  const [requestType, setRequestType] = useState(1)

  const handleClose = (refresh?: boolean) => {
    // se debe hacer algo
    // if (refresh) {
    //   setConsult(consult + 1)
    // }
    // closeModal()
  }
  const data=ClientRequestRecordForm;
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
        <ClientRequestRecordForm
        // data={data}
        closeModal={handleClose}
      />
      ) : (
        <ClientRequestPublicSpaceForm
          handleClose={closeModal}
        />
      )}
    </>
  )
}
