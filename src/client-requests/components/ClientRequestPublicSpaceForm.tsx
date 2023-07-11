import { Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { PublicSpace } from '../../public-spaces/interfaces/public-space.interface'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'
import { Label } from '../../shared/styled-components/Label'
import { Select } from '../../shared/styled-components/Select'
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
  const [publicSpaces, setPublicSpaces] = useState<
    PublicSpace[]
  >([])

  const initialValues: RequestPublicSpaceForm = {
    date: '',
    endHour: '',
    startHour: '',
    publicSpaceId: '',
  }

  const requestClientViewController =
    useRequestClientViewController()

  useEffect(() => {
    requestClientViewController
      .getPublicSpaces()
      .then((spaces) => {
        setPublicSpaces(spaces)
      })
  }, [])

  const handleSubmit = (values: RequestPublicSpaceForm) => {
    const request: RequestPublicSpaceDTO = {
      date: values.date,
      endHour: values.endHour,
      startHour: values.startHour,
      space: publicSpaces.find(
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
        <PublicSpacesSelect publicSpaces={publicSpaces} />
        <div>
          <Label htmlFor="date">Fecha para reserva</Label>
          <Input
            type="date"
            className="w-full"
            placeholder="Fecha"
            name="date"
          />
        </div>

        <ClientRequestHours publicSpaces={publicSpaces} />

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
