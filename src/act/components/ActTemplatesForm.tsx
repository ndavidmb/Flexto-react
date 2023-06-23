import { Field, Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { InputFile } from '../../shared/styled-components/InputFile'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { ActFormData } from '../interfaces/act-form-data.interface'

type TemplateName = Pick<ActTemplate, 'templateName'>
// Estos varían en el tipo de la data
type Props = {
  labelsName: string;
  data?: ActTemplate
  closeModal: (newTemplate?: ActFormData) => void
}

export const ActTemplatesForm: FC<Props> = ({
  labelsName,
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

  const handleSubmit = async (value: TemplateName) => {
    if (!formValue) {
      return
    }

    const newTemplate: ActFormData = { ...value, ...formValue }

    closeModal(newTemplate)
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
      <Form className="flex flex-col gap-3">
        <div className="flex flex-col text-gray-900">
          <label
            htmlFor="templateName"
            className="font-semibold p-1"
          >
            Nombre de la {labelsName}
          </label>
          <Field
            id="templateName"
            name="templateName"
            className="border bg-white px-2 py-1"
            placeholder={`Nombre de la ${labelsName}`}
          />
        </div>

        <div className='flex flex-col gap-1 w-96'>
          <label
            htmlFor="templateFile"
            className="font-semibold p-1"
          >
           Subir {labelsName}
          </label>
          <InputFile
            className="w-full"
            id="templateFile"
            onChange={(value) => {
              setDocument(value.blob, value.name)
            }}
          />
        </div>

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
