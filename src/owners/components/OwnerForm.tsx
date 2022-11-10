import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { useApartmentService } from '../../apartments/services/apartment.service'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { Select } from '../../shared/styled-components/Select'
import { emptyFields } from '../../shared/utils/emptyFields'
import {
  Owner,
  OwnerFromForm,
} from '../interfaces/owner.interface'
import { useOwnerService } from '../services/owner.service'

// Estos varían en el tipo de la data
type Props = {
  data?: Owner
  closeModal: (refresh?: boolean) => void
}

export const OwnerForm: FC<Props> = ({
  data,
  closeModal,
}) => {
  const [apartments, setApartments] = useState<Apartment[]>(
    [],
  )

  const apartmentService = useApartmentService()
  const ownerService = useOwnerService()

  const initialValues: OwnerFromForm = {
    // Si es string
    name: data?.name || '',
    phone: data?.phone || '',
    email: data?.email || '',
    // Si es number, boolean, etc
    apartmentId: data?.apartment?.id || '',
  }

  const dispatch = useDispatch()

  useEffect(() => {
    apartmentService.getApartments().then((apt) => {
      setApartments(apt)
    })
  }, [])

  const handleSubmit = (values: OwnerFromForm) => {
    // Pone el spinner a andar
    if (emptyFields(values)) {
      return
    }
    dispatch(setLoading(true))

    const owner = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      apartment: apartments.find(
        (apt) => apt.id === values.apartmentId,
      )!,
    }

    console.log(owner)

    if (data) {
      updateOwner(owner)
      return
    }

    createOwner(owner)
  }

  const updateOwner = (owner: Owner) => {
    ownerService
      .updateOwner(data?.id as string, owner)
      .then(() => {
        closeModal(true)
      })
      .finally(() => dispatch(setLoading(false)))
  }

  // Esto llama al service, y agrega un apartamento
  const createOwner = (owner: Owner) => {
    ownerService
      .addOwner(owner)
      .then(() => {
        closeModal(true)
      })
      .finally(() => dispatch(setLoading(false)))
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-2">
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="name"
            className="font-semibold p-1"
          >
            Nombre
          </label>
          <Field
            id="name"
            name="name"
            className="border bg-white px-2 py-1"
            placeholder="Nombre"
          />
        </div>
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="phone"
            className="font-semibold p-1"
          >
            Teléfono
          </label>
          <Field
            type="number"
            id="phone"
            name="phone"
            className="border bg-white px-2 py-1"
            placeholder="Teléfono"
          />
        </div>
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="apartmentId"
            className="font-semibold p-1"
          >
            Apartamento
          </label>
          <Select
            formik={true}
            id="apartmentId"
            name="apartmentId"
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
          <label
            htmlFor="email"
            className="font-semibold p-1"
          >
            Correo
          </label>
          <Field
            id="email"
            name="email"
            type="email"
            className="border bg-white px-2 py-1"
            placeholder="Correo"
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
