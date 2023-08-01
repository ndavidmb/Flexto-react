import { Form, Formik } from 'formik'
import { FC } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'
import { Label } from '../../shared/styled-components/Label'
import { Select } from '../../shared/styled-components/Select'
import { useApartmentViewController } from '../controllers/apartment.view.controller'
import {
  Apartment,
  ApartmentFromForm,
  ApartmentType,
} from '../interfaces/apartment.interface'
import { ApartmentMembers } from './ApartmentMembers'
import { ApartmentsPets } from './ApartmentsPets'

// Estos varían en el tipo de la data
type Props = {
  data?: Apartment
  closeModal: (refresh?: boolean) => void
}

export const ApartmentForm: FC<Props> = ({
  data,
  closeModal,
}) => {
  const initialValues: ApartmentFromForm = {
    // Si es string
    tower: data?.tower || '',
    apartmentNumber: data?.apartmentNumber || '',
    licensePlate: '',

    memberName: '',
    memberPhone: '',
    members: data?.extraInfo?.members || [],

    petType: 'cat',
    petDescription: '',
    petQuantity: 1,

    pets: data?.extraInfo?.pets || [],
    type: ApartmentType.APARTMENT,
  }

  const apartmentViewController =
    useApartmentViewController()

  const handleSubmit = (values: ApartmentFromForm) => {
    const apartment: Apartment = {
      // Se pasa de número a string
      apartmentNumber: values.apartmentNumber,
      tower: values.tower,
      owner: data?.owner || '',
      extraInfo: {
        members: values.members,
        pets: values.pets,
        type: values.type,
        vehicle: {
          licensePlate: values.licensePlate,
        },
      },
    }

    console.log(apartment)

    if (data) {
      updateApt(apartment)
      return
    }

    createApt(apartment)
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
      .addApartment(values)
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
        <div className="flex gap-2 w-full">
          <div className="flex flex-col text-gray-900 w-1/2">
            <Label htmlFor="tower" required={true}>
              Bloque
            </Label>
            <Input
              name="tower"
              className="border bg-white px-2 py-1"
              placeholder="Bloque"
              type="text"
            />
          </div>
          <div className="flex flex-col text-gray-900 w-1/2">
            <Label
              htmlFor="apartmentNumber"
              required={true}
            >
              Número de unidad residencial
            </Label>
            <Input
              name="apartmentNumber"
              className="border bg-white px-2 py-1"
              placeholder="Número de unidad residencial"
              type="text"
            />
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex flex-col text-gray-900 w-1/2">
            <Label htmlFor="type" required={true}>
              Tipo de unidad residencial
            </Label>
            <Select
              formik={true}
              allowUndefined={false}
              name="type"
            >
              <option value={ApartmentType.APARTMENT}>
                Apartamento
              </option>
              <option value={ApartmentType.HOUSE}>
                Casa
              </option>
            </Select>
          </div>
          <div className="flex flex-col text-gray-900 w-1/2">
            <Label htmlFor="licensePlate">
              Placa del vehículo
            </Label>
            <Input
              type="text"
              name="licensePlate"
              className="border bg-white px-2 py-1"
              placeholder="Placa del vehículo"
            />
          </div>
        </div>

        <ApartmentMembers />
        <ApartmentsPets />

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
