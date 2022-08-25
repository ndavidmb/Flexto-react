import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { getApartments } from '../../apartments/services/apartment.service'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { Owner } from '../interfaces/owner.interface'
import {
  addOwner,
  UpdateOwner
} from '../services/owner.service'

// Estos varían en el tipo de la data
// Estos varían en el tipo de la data
type Props = {
  data?: Owner
  closeModal: (refresh?: boolean) => void
}

export const OwnerForm: FC<Props> = ({
  data,
  closeModal,
}) => {
  const initialValues: Owner = {
    // Si es string
    name: data?.name || '',
    phone: data?.phone || '',
    email: data?.email || '',
    // Si es number, boolean, etc
    apartmentId: data?.apartmentId || '',
  }

  const dispatch = useDispatch()

  const handleSubmit = (values: Owner) => {
    // Pone el spinner a andar
    dispatch(setLoading(true))

    if (data) {
      updateOwnr(values)
      return
    }

    createOwnr(values)
  }

  const updateOwnr = (values: Owner) => {
    UpdateOwner(data?.id as string, values)
      .then(() => {
        closeModal(true)
      })
      .finally(() => dispatch(setLoading(false)))
  }

  const [apartments, setApartments] = useState<Apartment[]>(
    [],
  )
  useEffect(() => {
    getApartments().then((apt) => {
      setApartments(apt)
    })
  }, [])

  // Esto llama al service, y agrega un apartamento
  const createOwnr = (values: Owner) => {
    addOwner({
      // Se pasa de número a string
      name: values.name ,
      phone: values.phone,
      email: values.email,
      apartmentId: values.apartmentId,
    })
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
            htmlFor="apartamentId"
            className="font-semibold p-1"
          >
            Apartamento
          </label>
          <Field
            as="select"
            id="apartamentId"
            name="apartamentId"
            className="border bg-white px-2 py-1"
          >
            {apartments.map((apartment) => {
              return (
                <option value={apartment.id}>
                  {apartment.tower} - &nbsp;
                  {apartment.apartmentNumber}
                </option>
              )
            })}
          </Field>
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
          />
        </div>
        <div className="flex flex-row-reverse gap-3 pt-3">
          <Button type="submit" color="primary">
            Crear
          </Button>
          <Button color="link" onClick={() => closeModal()}>
            Cerrar
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
