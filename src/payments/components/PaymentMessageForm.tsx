import { FC } from 'react'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { OwnerPaymentVm } from '../interfaces/payment.interface'
import { Input } from '../../shared/styled-components/Input'
import { Form, Formik } from 'formik'
import { Label } from '../../shared/styled-components/Label'
import { TextArea } from '../../shared/styled-components/TextArea'
import { Button } from '../../shared/styled-components/Button'

type Props = {
  closeModal: () => void
  owner: OwnerPaymentVm
  handleSubmit: (values: {
    email: string
    message: string
  }) => void
}
export const PaymentMessageForm: FC<Props> = ({
  closeModal,
  owner,
  handleSubmit,
}) => {
  const initialValues = {
    email: owner.email,
    message: '',
  }

  return (
    <ModalContainer
      close={closeModal}
      title="Enviar mensaje"
    >
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Form>
          <div className="flex flex-col">
            <Label htmlFor="email">Para</Label>
            <Input
              className="w-full text-gray-500"
              disabled={true}
              name="email"
              type="text"
              placeholder="Nombre"
            />
          </div>

          <div className="flex flex-col mt-2">
            <Label htmlFor="message">Mensaje</Label>
            <TextArea
              placeholder="Enviar mensaje..."
              name="message"
            />
          </div>

          <div className="flex justify-end mt-2">
            <Button type="submit" color="primary">
              Enviar
            </Button>
          </div>
        </Form>
      </Formik>
    </ModalContainer>
  )
}
