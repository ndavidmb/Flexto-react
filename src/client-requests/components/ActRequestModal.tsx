import { FC, useEffect, useState } from 'react'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { ActRequestConnectOwnerForm } from './ActRequestConnectOwnerForm'
import { useRequestViewController } from '../controllers/request.view.controller'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { ActTemplate } from '../../act/interfaces/act-templates.interface'
import { useActViewController } from '../../act/controllers/act.view.controller'
import { getFormattedDate } from '../../shared/utils/formattedDate'

type Props = {
  data: AdminRequest
  closeModal: (refresh?: boolean) => void
  refreshState: (
    requestId: string,
    newState: RequestStates,
  ) => void
}

export const ActRequestModal: FC<Props> = ({
  closeModal,
  refreshState,
  data,
}) => {
  const [availableActs, setAvailableActs] = useState<
    ActTemplate[]
  >([])

  const requestViewController = useRequestViewController()
  const actViewController = useActViewController()

  useEffect(() => {
    const newData2 = new Date(data.dateDetail.date)
    newData2.setDate(newData2.getDate() + 1)

    actViewController
      .getAvailableAct(getFormattedDate(newData2))
      .then((data) => {
        setAvailableActs(data)
      })
  }, [])

  const handleCloseModal = (ids: string[]) => {
    if (ids.length === 0) {
      closeModal()
      return
    }

    requestViewController
      .acceptActRequest(data, ids)
      .then((successfully) => {
        if (successfully) {
          refreshState(data.id!, RequestStates.ACCEPTED)
        }
      })
      .finally(() => closeModal())
  }

  return (
    <ModalContainer
      close={closeModal}
      title="Acceso a actas"
    >
      <ActRequestConnectOwnerForm
        data={data}
        acts={availableActs}
        closeModal={handleCloseModal}
      />
    </ModalContainer>
  )
}
