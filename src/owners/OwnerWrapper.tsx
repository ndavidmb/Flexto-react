import { useEffect, useState } from 'react'
import { DefaultContainerWithSearch } from '../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { Button } from '../shared/styled-components/Button'
import { Table } from '../shared/styled-components/Table'
import { THead } from '../shared/styled-components/THead'
import { TRow } from '../shared/styled-components/TRow'
import { Owner } from './interfaces/owner.interface'
import { getOwner } from './services/owner.service'

export const OwnerWrapper = () => {
  const [owners, setOwners] = useState<Owner[]>([])

  // OnMounted
  useEffect(() => {
    getOwner().then((res) => {
      setOwners(res)
    })
  }, [])

  return (
    <DefaultContainerWithSearch
      action={() => {}}
      title="Propietarios"
    >
      <Table>
        <THead>
          <th scope="col">Nombre</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Apartamento</th>
          <th scope="col">Correo</th>
          <th scope="col">Acción</th>
        </THead>
        <tbody>
          {owners.map((owner, index) => (
            <TRow index={index} key={owner.name + index}>
              <th
                scope="row"
                className="font-medium text-gray-900 whitespace-nowrap"
              >
                {owner.name}
              </th>
              <td>{owner.phone}</td>
              <td>
                <div className="flex flex-col">
                  <span>Apto. 101</span>
                  <span>Bloque B2</span>
                </div>
              </td>
              <td>{owner.email}</td>
              <td className="flex gap-2">
                <Button color="link">Editar</Button>
                <Button color="link">Eliminar</Button>
              </td>
            </TRow>
          ))}
        </tbody>
      </Table>
    </DefaultContainerWithSearch>
  )
}
