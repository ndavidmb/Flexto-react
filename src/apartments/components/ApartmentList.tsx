import { FC } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { Apartment } from '../interfaces/apartment.interface'
import { ApartmentWithOwner } from './AparmentWithOwner'

type Props = {
  apartments: ApartmentWithOwner[]
  openEdit: (data?: Apartment) => void
  handleDelete: (id: string) => void
}

export const ApartmentList: FC<Props> = ({
  openEdit: open,
  apartments,
  handleDelete,
}) => {
  return (
    <Table>
      <THead>
        <th scope="col">Apartamento</th>
        <th scope="col">Torre</th>
        <th scope="col">Propietario</th>
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
            <td className='uppercase'>{apartment.tower}</td>
            <td>
              {apartment.hasOwner ? (
                <div className='flex flex-col'>
                  {apartment.name}
                  <span className="text-sm text-gray-400">
                    {apartment.email}
                  </span>
                </div>
              ) : (
                <div>Sin propietario</div>
              )}
            </td>
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
  )
}
