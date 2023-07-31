import { Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { BookingDTO } from '../../booking/interfaces/booking.interface'
import {
  PublicSpaceWithHours
} from '../../public-spaces/interfaces/public-space.interface'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'
import { Label } from '../../shared/styled-components/Label'
import { getInputInitialDate } from '../../shared/utils/formattedDate'
import { useRequestClientViewController } from '../controllers/request-client.view.controller'
import {
  RequestPublicSpaceDTO,
  RequestPublicSpaceForm,
} from '../interfaces/request-public-space.interface'
import { ClientRequestHours } from './ClientRequestHours'
import { PublicSpacesSelect } from './PublicSpacesSelect'

type Props = {
  handleClose: (refresh?: boolean) => void
}

export const ClientRequestPublicSpaceForm: FC<Props> = ({
  handleClose,
}) => {
  const [viewModel, setViewModel] = useState<{
    publicWithHours: PublicSpaceWithHours[]
    bookings: BookingDTO[]
  }>({
    publicWithHours: [],
    bookings: [],
  })

  const initialValues: RequestPublicSpaceForm = {
    date: getInputInitialDate(new Date()),
    endHour: 0,
    startHour: 0,
    publicSpaceId: '',
  }

  const requestClientViewController =
    useRequestClientViewController()

  useEffect(() => {
    requestClientViewController
      .getPublicSpaces()
      .then((vm) => {
        setViewModel(vm)
      })
  }, [])

  const handleSubmit = (values: RequestPublicSpaceForm) => {
    const request: RequestPublicSpaceDTO = {
      date: values.date,
      endHour: values.endHour,
      startHour: values.startHour,
      space: viewModel.publicWithHours.find(
        (space) => space.id === values.publicSpaceId,
      )!,
    }

    requestClientViewController
      .createPublicSpaceRequest(request)
      .then((successfully) => {
        if (successfully) {
          handleClose(true)
        }
      })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="mt-2">
        <PublicSpacesSelect
          publicSpaces={viewModel.publicWithHours}
        />
        <div>
          <Label htmlFor="date">Fecha para reserva</Label>
          <Input
            type="date"
            className="w-full"
            placeholder="Fecha"
            name="date"
          />
        </div>

        <ClientRequestHours viewModel={viewModel} />

        <div className="flex flex-row-reverse gap-3 pt-3">
          <Button type="submit" color="primary">
            Crear solicitud
          </Button>
          <Button
            color="link"
            onClick={() => handleClose()}
          >
            Cerrar
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
