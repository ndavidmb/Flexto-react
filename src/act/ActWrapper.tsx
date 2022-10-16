import { Form, Formik } from 'formik'
import jsPDF from 'jspdf'
import { DefaultContainer } from '../shared/components/DefaultContainer/DefaultContainer'
import { Button } from '../shared/styled-components/Button'
import { ActFormHeader } from './components/ActFormHeader'
import { ActFormTable } from './components/ActFormTable'

export const ActWrapper = () => {
  const handleForm = (values: unknown) => {
    console.log(values)
  }

  const handlePdf = () => {
    const doc = new jsPDF()
    doc.html(
      `
      <div>Hello</div>
      `,
      {
        callback: function (doc) {
          doc.save()
        },
        x: 10,
        y: 10,
      },
    )
  }

  return (
    <DefaultContainer>
      <div className="w-full flex justify-end px-4 pt-2">
        <Button onClick={handlePdf} color="primary">
          Crear PDF
        </Button>
      </div>
      <Formik onSubmit={handleForm} initialValues={{}}>
        <Form>
          <ActFormHeader />
        </Form>
      </Formik>
      <ActFormTable />
    </DefaultContainer>
  )
}
