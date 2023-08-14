import { FC, useEffect, useState } from 'react'
import { useApartmentViewController } from '../../apartments/controllers/apartment.view.controller'
import { Select } from '../../shared/styled-components/Select'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { Label } from '../../shared/styled-components/Label'
import { Button } from '../../shared/styled-components/Button'
import { ActTemplate } from '../../act/interfaces/act-templates.interface'
import { MultiSelect } from '../../shared/styled-components/MultiSelect'

type Props = {
  acts: ActTemplate[]
  closeModal: (id: string[]) => void
}
export const ActRequestConnectOwnerForm: FC<Props> = ({
  closeModal,
  acts,
}) => {
  const [chooseAct, setChooseAct] = useState<string[]>([])

  const handleClose = (save = false) => {
    if (save && chooseAct) {
      closeModal(chooseAct)
    }
  }

  const handleOnChange = (actId: string) => {
    console.log(actId);
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
        Actas disponibles
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
