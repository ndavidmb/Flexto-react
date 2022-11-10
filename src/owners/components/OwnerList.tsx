import {
  Dispatch,
  FC,
  SetStateAction
} from 'react'
import { IoSearch } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Owner } from '../interfaces/owner.interface'
import { useOwnerService } from './../services/owner.service'

type Props = {
  owners: Owner[]
  setOwners: Dispatch<SetStateAction<Owner[]>>
  openEdit: (data?: Owner) => void
}

export const OwnerList: FC<Props> = ({
  openEdit: open,
  owners,
  setOwners,
}) => {
  const dispatch = useDispatch()

  const ownerService = useOwnerService()

  const handleDelete = (id: string) => {
    dispatch(setLoading(true))
    ownerService
      .deleteOwner(id)
      .then(() => {
        setOwners(owners.filter((owner) => owner.id !== id))
      })
      .finally(() => dispatch(setLoading(false)))
  }

  return (
    <>
      <Table>
        <THead>
          <th scope="col" className="w-1"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Apartamento</th>
          <th scope="col">Correo</th>
          <th scope="col">Acción</th>
        </THead>
        <tbody>
          {owners.map((owner, index) => (
            <TRow index={index} key={owner.id}>
              <td className="w-1">
                <Link to={`./${owner.id}`}>
                  <IoSearch />
                </Link>
              </td>
              <th
                scope="row"
                className="font-medium text-gray-900 whitespace-nowrap"
              >
                {owner.name}
              </th>
              <td>{owner.phone}</td>
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
              <td>{owner.email}</td>
              <td className="flex gap-2">
                <Button
                  color="link"
                  onClick={() => open(owner)}
                >
                  Editar
                </Button>
                <Button
                  color="link"
                  onClick={() =>
                    handleDelete(owner.id as string)
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
