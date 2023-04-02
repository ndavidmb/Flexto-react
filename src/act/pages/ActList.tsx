import { Button } from '../../shared/styled-components/Button'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'

export const ActList = () => {
  return (
    <Table>
      <THead>
        <th>Acta</th>
        <th>PDF</th>
        <th>Acción</th>
      </THead>
      <tbody>
        <TRow index={0}>
          <th>Some name</th>
          <th>some pdf</th>
          <td>
            <Button
              color="link"
              onClick={() => {}}
            >
              Editar
            </Button>
          </td>
        </TRow>
      </tbody>
    </Table>
  )
}
