import { FC } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { Button } from '../../shared/styled-components/Button'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import {
  Owner,
  OwnerWithApartment,
} from '../interfaces/owner.interface'

type Props = {
  owners: OwnerWithApartment[]
  handleDelete: (owner: OwnerWithApartment) => void
}

export const OwnerList: FC<Props> = ({
  owners,
  handleDelete,
}) => {
  return (
    <>
      <Table>
        <THead>
          <th scope="col" className="w-1"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Unidad residencial</th>
          <th scope="col">Correo</th>
          <th scope="col">Acción</th>
        </THead>
        <tbody>
          {owners.map((owner, index) => (
            <TRow index={index} key={owner.id}>
              <td className="w-1">
                <Link to={`./${owner.uid}`}>
                  <IoSearch />
                </Link>
              </td>
              <th
                scope="row"
                className="font-medium text-gray-900"
              >
                {owner.displayName}
              </th>
              <td>{owner.phoneNumber}</td>
              <td>
                <div className="flex flex-col">
                  <span>
                    Apto. {owner.apartment?.apartmentNumber}
                  </span>
                  <span>
                    Bloque {owner.apartment?.tower}
                  </span>
                </div>
              </td>
              <td>
                <span className='break-words'>{owner.email}</span>
              </td>
              <td className="flex gap-2">
                <Button
                  color="link"
                  onClick={() => handleDelete(owner)}
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
