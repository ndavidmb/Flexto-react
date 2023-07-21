import { Field, Form, Formik } from 'formik'
import { FC } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { useApartmentViewController } from '../controllers/apartment.view.controller'
import { Apartment } from '../interfaces/apartment.interface'

// Estos varían en el tipo de la data
type Props = {
  data?: Apartment
  closeModal: (refresh?: boolean) => void
}

export const ApartmentForm: FC<Props> = ({
  data,
  closeModal,
}) => {
  const initialValues: Apartment = {
    // Si es string
    tower: data?.tower || '',
    apartmentNumber: data?.apartmentNumber || '',
  }

  const apartmentViewController = useApartmentViewController()

  const handleSubmit = (values: Apartment) => {
    if (data) {
      updateApt(values)
      return
    }

    createApt(values)
  }

  const updateApt = (values: Apartment) => {
    apartmentViewController
      .updateApartment(data?.id as string, values)
      .then(() => {
        closeModal(true)
      })
  }

  const createApt = (values: Apartment) => {
    apartmentViewController
      .addApartment({
        // Se pasa de número a string
        apartmentNumber: values.apartmentNumber,
        tower: values.tower,
        owner: "",
      })
      .then(() => {
        closeModal(true)
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
            htmlFor="tower"
            className="font-semibold p-1"
          >
            Bloque
          </label>
          <Field
            id="tower"
            name="tower"
            className="border bg-white px-2 py-1"
            placeholder="Bloque"
          />
        </div>
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="apartmentNumber"
            className="font-semibold p-1"
          >
            Número de unidad residencial
          </label>
          <Field
            id="apartmentNumber"
            name="apartmentNumber"
            className="border bg-white px-2 py-1"
            placeholder="Número de unidad residencial"
          />
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
