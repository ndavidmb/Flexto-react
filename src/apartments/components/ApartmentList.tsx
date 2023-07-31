import { FC } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import {
  Apartment,
  PET_TYPE,
} from '../interfaces/apartment.interface'
import { ApartmentWithOwner } from './AparmentWithOwner'
import { Link } from 'react-router-dom'

type Props = {
  apartments: ApartmentWithOwner[]
  openEdit: (data?: Apartment) => void
  handleDelete: (apartment: ApartmentWithOwner) => void
}

export const ApartmentList: FC<Props> = ({
  openEdit: open,
  apartments,
  handleDelete,
}) => {
  return (
    <Table>
      <THead>
        <th scope="col">Unidad residencial</th>
        <th scope="col">Habitantes</th>
        <th scope="col">Mascotas</th>
        <th scope="col">Vehículos</th>
        <th scope="col">Acción</th>
      </THead>
      <tbody>
        {apartments.map((apartment, index) => (
          <TRow index={index} key={apartment.id}>
            <th
              scope="row"
              className="font-medium text-gray-900 whitespace-nowrap"
            >
              {apartment.tower} -{' '}
              {apartment.apartmentNumber}
            </th>
            <td>
              {apartment.hasOwner ? (
                <Link
                  to={`../owners/${apartment.ownerId}`}
                  className="flex flex-col hover:underline text-primary"
                >
                  {apartment.name}
                  {/* <span className="text-sm text-gray-400">
                    {apartment.email}
                  </span> */}
                </Link>
              ) : (
                <div>Sin propietario</div>
              )}
              {apartment.extraInfo?.members ? (
                <ul className="ml-3 list-disc">
                  {apartment.extraInfo?.members?.map(
                    (member) => (
                      <li key={member.name}>
                        {member.name}
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <div>No aplica</div>
              )}
            </td>

            <td>
              {apartment.extraInfo &&
              apartment.extraInfo.pets?.length > 0 ? (
                <ul>
                  {apartment.extraInfo.pets.map(
                    (pet, i) => (
                      <li key={i}>
                        {pet.quantity} {PET_TYPE[pet.type]}
                        {pet.quantity > 2 ? 's' : ''}
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <div>No tiene mascotas</div>
              )}
            </td>

            <td>
              {apartment.extraInfo?.vehicle &&
              apartment.extraInfo?.vehicle.licensePlate !==
                '' ? (
                <p>
                  {apartment.extraInfo.vehicle.licensePlate}
                </p>
              ) : (
                <p>No Aplica</p>
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
                onClick={() => handleDelete(apartment)}
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
