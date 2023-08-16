import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { useApartmentViewController } from '../../apartments/controllers/apartment.view.controller'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { Select } from '../../shared/styled-components/Select'
import { emptyFields } from '../../shared/utils/emptyFields'
import {
  Owner,
  OwnerFromForm,
  OwnerWithApartment,
} from '../interfaces/owner.interface'
import { useOwnerViewController } from '../controllers/owner.view.controller'
import { Label } from '../../shared/styled-components/Label'

// Estos varían en el tipo de la data
type Props = {
  data?: OwnerWithApartment
  closeModal: (refresh?: boolean) => void
}

export const OwnerForm: FC<Props> = ({
  data,
  closeModal,
}) => {
  const [apartments, setApartments] = useState<Apartment[]>(
    [],
  )

  const apartmentService = useApartmentViewController()
  const ownerViewController = useOwnerViewController()

  const initialValues: OwnerFromForm = {
    // Si es string
    name: data?.displayName || '',
    phone: data?.phoneNumber || '',
    email: data?.email || '',
    // Si es number, boolean, etc
    apartmentId: data?.apartment?.id || '',
  }

  useEffect(() => {
    apartmentService
      .getAvailableApartments()
      .then((apt) => {
        setApartments(apt)
      })
  }, [])

  const handleSubmit = (values: OwnerFromForm) => {
    // Pone el spinner a andar
    if (emptyFields(values)) {
      return
    }

    const owner = {
      name: values.name,
      phone: values.phone,
      uid: '',
      email: values.email,
      apartment: apartments.find(
        (apt) => apt.id === values.apartmentId,
      )!,
    }

    if (data) {
      updateOwner(owner)
      return
    }

    createOwner(owner)
  }

  const updateOwner = (owner: Owner) => {
    owner.id = data!.id!
    ownerViewController
      .updateOwner(owner)
      .then((successfully) => {
        if (successfully) {
          closeModal(true)
        }
      })
  }

  const createOwner = (owner: Owner) => {
    ownerViewController
      .createOwner(owner)
      .then((successfully) => {
        if (successfully) {
          closeModal(true)
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
          <Label htmlFor="name" required={true}>
            Nombre
          </Label>
          <Field
            id="name"
            name="name"
            className="border bg-white px-2 py-1"
            placeholder="Nombre"
            required
          />
        </div>
        <div className="flex flex-col text-gray-900">
          <Label htmlFor="phone" required={true}>
            Teléfono
          </Label>
          <Field
            type="number"
            id="phone"
            name="phone"
            className="border bg-white px-2 py-1"
            placeholder="Teléfono"
            required
          />
        </div>
        <div className="flex flex-col text-gray-900">
          <Label htmlFor="apartmentId" required={true}>
            Unidad residencial
          </Label>
          <Select
            disabled={Boolean(data)}
            className="disabled:text-gray-500 disabled:bg-gray-100"
            formik={true}
            id="apartmentId"
            name="apartmentId"
            required
          >
            {apartments.map((apartment) => {
              return (
                <option
                  value={apartment.id}
                  key={apartment.id}
                >
                  {apartment.tower} - &nbsp;
                  {apartment.apartmentNumber}
                </option>
              )
            })}
          </Select>
        </div>
        <div className="flex flex-col text-gray-900">
          <Label htmlFor="email" required={true}>
            Correo
          </Label>
          <Field
            disabled={Boolean(data)}
            id="email"
            name="email"
            type="email"
            className="border bg-white px-2 py-1 disabled:text-gray-500 disabled:bg-gray-100"
            placeholder="Correo"
            required
          ></Field>
        </div>
        <div className="flex flex-row-reverse gap-3 pt-3">
          <Button type="submit" color="primary">
            {data ? 'Actualizar' : 'Crear'}
          </Button>
          <Button color="link" onClick={() => closeModal()}>
            Cerrar
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
