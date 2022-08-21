import { useEffect, useState } from 'react'
import { DefaultContainerWithSearch } from '../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { Button } from '../shared/styled-components/Button'
import { Table } from '../shared/styled-components/Table'
import { THead } from '../shared/styled-components/THead'
import { TRow } from '../shared/styled-components/TRow'
import { State } from './interfaces/state.interface'
import { getState } from './services/state.service'

export const StatesWrapper = () => {
  const [states, setStates] = useState<State[]>([])

  useEffect(() => {
    getState().then((res) => {
      setStates(res)
    })
  }, [])

  return (
    <DefaultContainerWithSearch action={() => {}} title="Estados">
      <Table>
        <THead>
          <th scope="col">Asunto</th>
          <th scope="col">Detalle</th>
          <th scope="col">Estado</th>
          <th scope="col">Acción</th>
        </THead>
        <tbody>
          {states.map((state, index) => (
            <TRow index={index} key={state.affair + index}>
              <th
                scope="row"
                className="font-medium text-gray-900 whitespace-nowrap"
              >
                {state.affair}
              </th>
              <td>{state.detail}</td>
              <td>
                <ul>
                  {state.state.map((s, pepito) => (
                    <li key={s + pepito}>{s}</li>
                  ))}
                </ul>
              </td>
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
