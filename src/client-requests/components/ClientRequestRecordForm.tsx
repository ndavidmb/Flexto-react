import { Field, Form, Formik } from 'formik'
import { Button } from '../../shared/styled-components/Button'
import { FC } from 'react'
import { ClientRequestRecord } from '../interfaces/client-request.interface'
import { TextArea } from '../../shared/styled-components/TextArea'

type Props = {
  data?: ClientRequestRecord
  closeModal: (refresh?: boolean) => void
}

export const ClientRequestRecordForm: FC<Props> = ({
  data,
  closeModal,
}) => {
  const initialValues: ClientRequestRecord = {
    date: data?.date || '',
    recordDetail: data?.recordDetail || '',
  }
  const handleSubmit = (values: ClientRequestRecord) => {
    if (data) {
      createRecordRequest(values)
    }
  }
  const createRecordRequest = (values: ClientRequestRecord) => {
    // se debe crear la acta
    // apartmentViewController
    //   .addApartment({
    //     // Se pasa de número a string
    //     apartmentNumber: values.apartmentNumber,
    //     tower: values.tower,
    //     owner: "",
    //   })
    //   .then(() => {
    //     closeModal(true)
    //   })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-2">
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="dateRecord"
            className="font-semibold p-1"
          >
            Fecha
          </label>
          <Field
            type="date"
            id="dateRecord"
            name="dateRecord"
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
          <Button color="link" onClick={() => closeModal()}>
            Cerrar
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
