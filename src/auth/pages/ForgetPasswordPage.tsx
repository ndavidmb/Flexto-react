import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'

export const ForgetPasswordPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (values: {
    email: string
  }) => {
    console.log(values)
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <section className="flex flex-col gap-4 justify-center items-center bg-gray-100 w-full h-screen">
      <div className="bg-white flex flex-col p-8 gap-2 rounded shadow w-96">
        <h2 className="font-semibold text-2xl flex flex-col items-center mb-3">
          ¿Olvido su contraseña?
          <small className="text-gray-400 font-light text-lg">
            Diligencie su correo electrónico
          </small>
        </h2>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form className='flex flex-col gap-3'>
            <div className="w-full flex flex-col">
              <Input
                name="email"
                type="email"
                placeholder="Correo electrónico"
              />
            </div>
            <div className="w-full flex gap-1 justify-end">
              <Button
                onClick={handleBack}
                type="button"
                color="secondary"
              >
                Volver
              </Button>
              <Button type="submit" color="primary">
                Enviar
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  )
}
