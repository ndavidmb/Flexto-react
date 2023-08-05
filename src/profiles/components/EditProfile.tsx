import { Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useOwnerViewController } from '../../owners/controllers/owner.view.controller'
import { OwnerView } from '../../owners/interfaces/owner.view.interface'
import { IUserState } from '../../shared/store/interfaces/auth/auth.interface'
import { Input } from '../../shared/styled-components/Input'
import { Label } from '../../shared/styled-components/Label'
import { InputFile } from '../../shared/styled-components/InputFile'
import { Button } from '../../shared/styled-components/Button'
import { OwnerUpdated } from '../interfaces/profile.interface'

type Props = {
  authState: IUserState
  closeModal: () => void
}

export const EditProfile: FC<Props> = ({
  authState,
  closeModal,
}) => {
  const [ownerVw, setOwnerVw] = useState<OwnerView | null>(
    null,
  )
  const ownerViewController = useOwnerViewController()

  const initialValues: OwnerUpdated = {
    displayName: ownerVw?.owner.displayName ?? '',
    phoneNumber: ownerVw?.owner.phoneNumber ?? '',
    blob: new Blob(),
    name: '',
  }

  const handleSubmit = (values: OwnerUpdated) => {
    if (ownerVw) {
      ownerViewController
        .updateOwnerProfile(values, ownerVw.owner)
        .then((successfully) => {
          if (successfully) {
            closeModal()
          }
        })
    }
  }

  useEffect(() => {
    ownerViewController
      .getOwnerProfileDetail(authState.uid)
      .then((owner) => {
        setOwnerVw(owner)
      })
  }, [])

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <div className="w-full">
            <Label htmlFor="displayName">Nombre completo</Label>
            <Input
              className="w-full"
              name="displayName"
              type="text"
              placeholder="Nombre completo"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="email">Nro. Celular</Label>
            <Input
              className="w-full"
              name="phoneNumber"
              type="number"
              placeholder="Nro. Celular"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="photo">Cambiar foto</Label>
            <InputFile
              id="photo"
              onChange={({ blob, name }) => {
                props.setFieldValue('blob', blob)
                props.setFieldValue('name', name)
              }}
            />
          </div>

          <div className="flex gap-2 justify-end mt-3">
            <Button
              onClick={closeModal}
              type="button"
              color="link"
            >
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Guardar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
