import { FC } from 'react'
import { PublicSpace } from '../interfaces/public-space.interface'
import { Table } from '../../shared/styled-components/Table'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { AvailableDays } from './AvailableDays'
import { parseHour } from '../utils/changeFormatHour'
import { Button } from '../../shared/styled-components/Button'

type Props = {
  publicSpaces: PublicSpace[]
  handleDelete: (space: PublicSpace) => void
  handleEdit: (space: PublicSpace) => void
}

export const PublicSpacesList: FC<Props> = ({
  publicSpaces,
  handleDelete,
  handleEdit,
}) => {
  return (
    <Table>
      <THead>
        <th>Nombre</th>
        <th>Horario</th>
        <th>Días hábiles</th>
        <th>Acciones</th>
      </THead>
      <tbody>
        {publicSpaces.map((space, index) => (
          <TRow key={space.id} index={index}>
            <td>{space.name}</td>
            <td>
              <ul>
                <li>
                  Cantidad por hora{' '}
                  {space.schedule.maxPerHour}
                </li>
                <li>
                  Hora de apertura{' '}
                  {parseHour(space.schedule.rangeStartHour)}
                </li>
                <li>
                  Hora de cierre{' '}
                  {parseHour(space.schedule.rangeEndHour)}
                </li>
              </ul>
            </td>
            <td>
              <AvailableDays days={space.schedule.days} />
            </td>
            <td className="flex gap-2">
              <Button
                color="link"
                onClick={() => handleEdit(space)}
              >
                Editar
              </Button>
              <Button
                color="link"
                onClick={() => handleDelete(space)}
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
