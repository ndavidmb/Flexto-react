import { FC, useEffect, useState } from 'react'
import { useApartmentViewController } from '../../apartments/controllers/apartment.view.controller'
import { Select } from '../../shared/styled-components/Select'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { Label } from '../../shared/styled-components/Label'
import { Button } from '../../shared/styled-components/Button'

type Props = {
  closeModal: (apartment?: Apartment) => void
}
export const AdminRequestConnectOwnerForm: FC<Props> = ({
  closeModal,
}) => {
  const [chooseApartment, setChooseApartment] =
    useState<Apartment | null>(null)
  const [availableApartments, setAvailableApartments] =
    useState<Apartment[]>([])

  const apartmentController = useApartmentViewController()

  useEffect(() => {
    apartmentController
      .getAvailableApartments()
      .then((apartments) => {
        setAvailableApartments(apartments)
      })
  }, [])

  const handleClose = (save = false) => {
    if (save && chooseApartment) {
      closeModal(chooseApartment)
      return
    }

    closeModal()
  }

  const handleOnChange = (apartmentId: string) => {
    const apartment = availableApartments.find(
      (apt) => apt.id === apartmentId,
    )
    setChooseApartment(apartment ?? null)
  }

  return (
    <section>
      <Label htmlFor="apartments" required={true}>
        Unidades disponibles
      </Label>
      <Select
        onChange={(ev) => handleOnChange(ev.target.value)}
        value={chooseApartment?.id}
        id="apartments"
        className="w-full"
      >
        {availableApartments.map((apartment) => (
          <option value={apartment.id} key={apartment.id}>
            {apartment.tower} - &nbsp;
            {apartment.apartmentNumber}
          </option>
        ))}
      </Select>

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
