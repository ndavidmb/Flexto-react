import { Field, Form, Formik } from 'formik'
import { Button } from '../../shared/styled-components/Button'
import { FC } from 'react'
import { ClientRequestRecord } from '../interfaces/client-request.interface'
import { TextArea } from '../../shared/styled-components/TextArea'
import { useRequestClientViewController } from '../controllers/request-client.view.controller'
import { getInputInitialDate } from '../../shared/utils/formattedDate'

type Props = {
  handleClose: (refresh?: boolean) => void
}

export const ClientRequestRecordForm: FC<Props> = ({
  handleClose,
}) => {
  
  const initialValues: ClientRequestRecord = {
    date: getInputInitialDate(new Date()),
    recordDetail: '',
  }
  const requestClientViewController =
  useRequestClientViewController()
  
  const handleSubmit = (values: ClientRequestRecord) => {

    const request: ClientRequestRecord = {
      date: values.date,
      recordDetail:values.recordDetail
    }

    requestClientViewController
      .createActRequest(request)
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
      <Form className="flex flex-col gap-2">
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="date"
            className="font-semibold p-1"
          >
            Fecha
          </label>
          <Field
            type="date"
            id="date"
            name="date"
            className="border bg-white px-2 py-1"
            placeholder="Fecha"
          />
        </div>
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="recordDetail"
            className="font-semibold p-1"
          >
            Detalle del acta
          </label>
          <TextArea
            placeholder="Detalle del acta (Ej. Número de apartamento y torre a la cuál va a hacer uso)"
            name="recordDetail"
            rows={3}
          />
        </div>
        <div className="flex flex-row-reverse gap-3 pt-3">
          <Button type="submit" color="primary">
            Enviar solicitud
          </Button>
          <Button color="link" onClick={() => handleClose()}>
            Cerrar
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
