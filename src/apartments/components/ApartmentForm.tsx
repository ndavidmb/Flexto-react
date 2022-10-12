import { Field, Form, Formik } from 'formik'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { Apartment } from '../interfaces/apartment.interface'
import { useApartmentService } from '../services/apartment.service'

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

  const dispatch = useDispatch()

  const apartmentService = useApartmentService()

  const handleSubmit = (values: Apartment) => {
    // Pone el spinner a andar
    dispatch(setLoading(true))

    if (data) {
      updateApt(values)
      return
    }

    createApt(values)
  }

  const updateApt = (values: Apartment) => {
    apartmentService
      .updateApartment(data?.id as string, values)
      .then(() => {
        closeModal(true)
      })
      .finally(() => dispatch(setLoading(false)))
  }

  // Esto llama al service, y agrega un apartamento
  const createApt = (values: Apartment) => {
    apartmentService
      .addApartment({
        // Se pasa de número a string
        apartmentNumber: values.apartmentNumber,
        tower: values.tower,
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
            Número de apartamento
          </label>
          <Field
            id="apartmentNumber"
            name="apartmentNumber"
            className="border bg-white px-2 py-1"
            placeholder="Número de apartamento"
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
