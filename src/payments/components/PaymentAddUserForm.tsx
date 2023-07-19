import { Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useOwnerViewController } from '../../owners/controllers/owner.view.controller'
import { Owner } from '../../owners/interfaces/owner.interface'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { Label } from '../../shared/styled-components/Label'
import { Select } from '../../shared/styled-components/Select'
import { Button } from '../../shared/styled-components/Button'

type Props = {
  handleClose: () => void
  handleSubmit: (data: { ownerId: string }) => void
}
export const PaymentAddUserForm: FC<Props> = ({
  handleClose,
  handleSubmit,
}) => {
  const [owners, setOwners] = useState<Owner[]>([])
  const ownerViewController = useOwnerViewController()

  useEffect(() => {
    ownerViewController.getOwners().then((owners) => {
      setOwners(owners)
    })
  }, [])

  return (
    <ModalContainer
      close={handleClose}
      title="Agregar un usuario"
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          ownerId: owners[0]?.id ?? '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex flex-col">
            <Label required={true} htmlFor="ownerId">
              Propietario
            </Label>
            <Select
              name="ownerId"
              formik={true}
              allowUndefined={false}
            >
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} -- Apto.{' '}
                  {owner.apartment.apartmentNumber} -{' '}
                  {owner.apartment.tower}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-row-reverse gap-3 pt-3">
            <Button type="submit" color="primary">
              Agregar
            </Button>
            <Button color="link" onClick={handleClose}>
              Cerrar
            </Button>
          </div>
        </Form>
      </Formik>
    </ModalContainer>
  )
}
