import { Dispatch, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Apartment } from '../interfaces/apartment.interface'
import { useApartmentService } from './../services/apartment.service'

type Props = {
  apartments: Apartment[],
  setApartments: Dispatch<React.SetStateAction<Apartment[]>>
  openEdit: (data?: Apartment) => void
}

export const ApartmentList: FC<Props> = ({
  openEdit: open,
  apartments,
  setApartments
}) => {
  const dispatch = useDispatch()

  const apartmentService = useApartmentService()
  


  const handleDelete = (id: string) => {
    dispatch(setLoading(true))
    apartmentService
      .deleteApartment(id)
      .then(() => {
        setApartments(
          apartments.filter(
            (apartment) => apartment.id !== id,
          ),
        )
      })
      .finally(() => dispatch(setLoading(false)))
  }

  return (
    <>
      <Table>
        <THead>
          <th scope="col">Apartamento</th>
          <th scope="col">Torre</th>
          <th scope="col">Acción</th>
        </THead>
        <tbody>
          {apartments.map((apartment, index) => (
            <TRow index={index} key={apartment.id}>
              <th
                scope="row"
                className="font-medium text-gray-900 whitespace-nowrap"
              >
                {apartment.apartmentNumber}
              </th>
              <td>{apartment.tower}</td>
              <td className="flex gap-2">
                <Button
                  color="link"
                  onClick={() => open(apartment)}
                >
                  Editar
                </Button>
                <Button
                  color="link"
                  onClick={() =>
                    handleDelete(apartment.id as string)
                  }
                >
                  Eliminar
                </Button>
              </td>
            </TRow>
          ))}
        </tbody>
      </Table>
    </>
  )
}
