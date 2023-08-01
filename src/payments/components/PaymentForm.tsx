import { FC } from 'react'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { Form, Formik } from 'formik'
import {
  Payment,
  PaymentWithId,
} from '../interfaces/payment.interface'
import { Label } from '../../shared/styled-components/Label'
import { Input } from '../../shared/styled-components/Input'
import { Button } from '../../shared/styled-components/Button'

type Props = {
  data: PaymentWithId | undefined
  handleClose: () => void
  handleSubmit: (values: Payment) => void
}
export const PaymentForm: FC<Props> = ({
  handleClose,
  handleSubmit,
  data,
}) => {
  const submit = (values: {
    description: string
    price: string
  }) => {
    handleSubmit({
      description: values.description,
      price: Number(values.price),
    })
  }

  return (
    <ModalContainer
      close={handleClose}
      title="Editar servicio"
    >
      <Formik
        initialValues={{
          description: data?.description ?? '',
          price: String(data?.price) ?? '',
        }}
        onSubmit={submit}
      >
        <Form>
          <div className="w-full flex flex-col gap-1">
            <Label htmlFor="description" required={true}>
              Descripción
            </Label>
            <Input
              name="description"
              type="text"
              placeholder="Descripción"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <Label htmlFor="price" required={true}>
              Valor
            </Label>
            <Input
              name="price"
              type="number"
              placeholder="Valor"
            />
          </div>
          <div className="flex flex-row-reverse gap-3 pt-3">
            <Button type="submit" color="primary">
              {data ? 'Actualizar' : 'Crear'}
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
    </ModalContainer>
  )
}
