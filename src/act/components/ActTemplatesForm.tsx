import { Field, Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { InputFile } from '../../shared/styled-components/InputFile'
import { useActController } from '../controllers/act.controller'
import { ActTemplate } from '../interfaces/act-templates.interface'

type TemplateName = Pick<ActTemplate, 'templateName'>
// Estos varían en el tipo de la data
type Props = {
  data?: ActTemplate
  id?: string
  closeModal: (refresh?: boolean) => void
}

export const ActTemplatesForm: FC<Props> = ({
  id,
  data,
  closeModal,
}) => {
  const [formValue, setFormValue] = useState<{
    file: Blob
    documentName: string
  } | null>(null)

  const initialData: TemplateName = {
    templateName: data?.templateName || '',
  }

  const actController = useActController()

  const handleSubmit = async (value: TemplateName) => {
    if (!formValue) {
      return
    }

    const newTemplate = { ...value, ...formValue }
    // If it is not edit
    if (id && data) {
      await actController.updateTemplate({
        id,
        formData: newTemplate,
        oldTemplate: data
      })
    } else {
      await actController.addTemplate(newTemplate)
    }

    closeModal(true)
  }

  const setDocument = (
    file: Blob,
    documentName: string,
  ) => {
    setFormValue({
      file,
      documentName,
    })
  }

  return (
    <Formik
      initialValues={initialData}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="templateName"
            className="font-semibold p-1"
          >
            Nombre de la plantilla
          </label>
          <Field
            id="templateName"
            name="templateName"
            className="border bg-white px-2 py-1"
            placeholder="Nombre de la plantilla"
          />
        </div>

        <InputFile
          className="w-full"
          id="templateFile"
          onChange={(value) => {
            setDocument(value.blob, value.name)
          }}
        />

        <div className="flex flex-row-reverse gap-3 pt-3">
          <Button type="submit" color="primary">
            Guardar
          </Button>
          <Button color="link" onClick={() => closeModal()}>
            Cerrar
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
