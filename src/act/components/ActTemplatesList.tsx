import { FC } from 'react'
import { AiOutlineFileWord } from 'react-icons/ai'
import { Button } from '../../shared/styled-components/Button'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { ActTemplate } from '../interfaces/act-templates.interface'

type Props = {
  templates: ActTemplate[]
  labelsName: string
  editTemplate: (data: ActTemplate) => void
  deleteTemplate: (templateId: string) => void
}

export const ActTemplatesList: FC<Props> = ({
  templates,
  labelsName,
  editTemplate,
  deleteTemplate,
}) => {
  return (
    <Table>
      <THead>
        <th>Nombre de {labelsName}</th>
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
                target='_blank'
                className="flex gap-1 items-center"
              >
                <AiOutlineFileWord
                  size={20}
                  color="#027dd7"
                />
                <span className="hover:underline cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden sm:max-w-[130px]">
                  {template.documentName}
                </span>
              </a>
            </td>

            <td>
              <div className="flex gap-2">
                {labelsName === 'plantilla' && (
                  <Button
                    onClick={() => editTemplate(template)}
                    color="link"
                  >
                    Actualizar
                  </Button>
                )}

                <Button
                  onClick={() =>
                    deleteTemplate(template.id!)
                  }
                  color="link"
                >
                  Eliminar
                </Button>
              </div>
            </td>
          </TRow>
        ))}
      </tbody>
    </Table>
  )
}
