import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { Button } from '../../shared/styled-components/Button'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { State } from '../interfaces/state.interface'
import { useStateService } from './../services/state.service'

type Props = {
  openEdit: (data?: State) => void
  states: State[]
  setStates: Dispatch<SetStateAction<State[]>>
}

export const StateList: FC<Props> = ({
  openEdit: open,
  states,
  setStates,
}) => {
  const dispatch = useDispatch()

  const stateService = useStateService()

  const handleDelete = (id: string) => {
    dispatch(setLoading(true))
    stateService
      .deleteState(id)
      .then(() => {
        setStates(states.filter((state) => state.id !== id))
      })
      .finally(() => dispatch(setLoading(false)))
  }

  return (
    <>
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
                <ul className="list-disc">
                  {state.state.map((s, estado) => (
                    <li key={s + estado}>{s}</li>
                  ))}
                </ul>
              </td>
              <td className="flex gap-2">
                <Button
                  color="link"
                  onClick={() => open(state)}
                >
                  Editar
                </Button>
                <Button
                  color="link"
                  onClick={() =>
                    handleDelete(state.id as string)
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
