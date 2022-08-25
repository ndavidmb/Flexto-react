import {
  DocumentData,
  Query
} from 'firebase/firestore/lite'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Pagination } from '../../shared/components/Pagination'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Apartment } from '../interfaces/apartment.interface'
import {
  deleteApartment, getPaginateApartments
} from './../services/apartment.service'

type Props = {
  consult: number
  openEdit: (data?: Apartment) => void
}

export const ApartmentList: FC<Props> = ({
  openEdit: open,
  consult,
}) => {
  const dispatch = useDispatch()

  const [apartments, setApartments] = useState<Apartment[]>(
    [],
  )

  const [paginate, setPaginate] = useState<{
    next: Query<DocumentData>
    previous: Query<DocumentData>
    totalPages: number
  } | null>(null)

  useEffect(() => {
    dispatch(setLoading(true))
    getPaginateApartments(10)
      .then(
        ({ previous, apartments, next, totalPages }) => {
          setApartments(apartments)
          setPaginate({ previous, next, totalPages })
        },
      )
      .finally(() => dispatch(setLoading(false)))
  }, [consult])

  const handleDelete = (id: string) => {
    dispatch(setLoading(true))
    deleteApartment(id)
      .then(() => {
        setApartments(
          apartments.filter(
            (apartment) => apartment.id !== id,
          ),
        )
      })
      .finally(() => dispatch(setLoading(false)))
  }

  const handleNext = () => {
    dispatch(setLoading(true))
    getPaginateApartments(10, paginate?.next)
      .then(
        ({ previous, apartments, next, totalPages }) => {
          setApartments(apartments)
          setPaginate({ previous, next, totalPages })
        },
      )
      .finally(() => dispatch(setLoading(false)))
  }

  const handlePrevious = () => {
    dispatch(setLoading(true))
    getPaginateApartments(10, paginate?.previous)
      .then(
        ({ previous, apartments, next, totalPages }) => {
          setApartments(apartments)
          setPaginate({ previous, next, totalPages })
        },
      )
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
      {paginate && (
        <Pagination
          next={handleNext}
          previous={handlePrevious}
          totalPages={paginate.totalPages}
        ></Pagination>
      )}
    </>
  )
}
