import { FC, useState } from 'react'
import { ActTemplate } from '../../act/interfaces/act-templates.interface'
import { Button } from '../../shared/styled-components/Button'
import { Label } from '../../shared/styled-components/Label'
import { MultiSelect } from '../../shared/styled-components/MultiSelect'
import { AdminRequest } from '../interfaces/request.interface'

type Props = {
  data: AdminRequest
  acts: ActTemplate[]
  closeModal: (id: string[]) => void
}
export const ActRequestConnectOwnerForm: FC<Props> = ({
  data,
  closeModal,
  acts,
}) => {
  const [chooseAct, setChooseAct] = useState<string[]>([])

  const handleClose = (save = false) => {
    if (save && chooseAct) {
      closeModal(chooseAct)
    }

    closeModal([])
  }

  const handleOnChange = (actId: string) => {
    console.log(actId)
    if (
      chooseAct.some((id) => {
        return id === actId
      })
    ) {
      setChooseAct(chooseAct.filter((id) => id !== actId))
    } else {
      setChooseAct([...chooseAct, actId])
    }
  }

  return (
    <section>
      <Label htmlFor="acts" required={true}>
        {`Actas disponibles para la fecha ${data.dateDetail.date}`}
      </Label>
      <MultiSelect
        onChange={(ev) => handleOnChange(ev.target.value)}
        value={chooseAct ?? []}
        id="act"
        className="w-full h-20"
        multiple
        allowUndefined={false}
      >
        {acts.map((act) => (
          <option value={act.id} key={act.id}>
            {act.documentName} - &nbsp;
          </option>
        ))}
      </MultiSelect>

      <div className="flex flex-row-reverse gap-3 pt-3">
        <Button
          color="primary"
          onClick={() => handleClose(true)}
        >
          Guardar
        </Button>
        <Button color="link" onClick={() => handleClose()}>
          Cerrar
        </Button>
      </div>
    </section>
  )
}
