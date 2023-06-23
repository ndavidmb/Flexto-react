import { FC } from 'react'
import { BsFileEarmarkPdfFill } from 'react-icons/bs'
import { Button } from '../../shared/styled-components/Button'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { ActTemplate } from '../interfaces/act-templates.interface'

type Props = {
  templates: ActTemplate[]
  editTemplate: (data: ActTemplate) => void
}

export const ActTemplatesList: FC<Props> = ({
  templates,
  editTemplate,
}) => {
  return (
    <Table>
      <THead>
        <th>Nombre de plantilla</th>
        <th>PDF</th>
        <th>Acción</th>
      </THead>
      <tbody>
        {templates.map((template, index) => (
          <TRow index={index} key={template.id}>
            <th>{template.templateName}</th>
            <td>
              <a
                href={template.documentUrl}
                className="flex gap-2 items-center"
              >
                <BsFileEarmarkPdfFill
                  size={24}
                  color="#b30b00"
                />
                <span className="hover:underline cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden sm:max-w-[130px]">
                  {template.documentName}
                </span>
              </a>
            </td>

            <td>
              <div className="flex gap-2">
                <Button
                  onClick={() => editTemplate(template)}
                  color="link"
                >
                  Actualizar
                </Button>
                <Button color="link">Eliminar</Button>
              </div>
            </td>
          </TRow>
        ))}
      </tbody>
    </Table>
  )
}
