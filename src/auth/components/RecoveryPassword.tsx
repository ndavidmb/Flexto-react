import { Form, Formik } from 'formik'
import { useState } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { ErrorAlert } from '../../shared/styled-components/ErrorAlert'
import { Input } from '../../shared/styled-components/Input/Input'

export const RecoveryPassword = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (values: { email: string }) => {}

  return (
    <section className="flex flex-col gap-4 justify-center items-center bg-gray-100 w-full h-screen">
      <div className="bg-white flex flex-col p-8 gap-2 rounded shadow">
        <h2 className="font-semibold text-2xl flex flex-col items-center mb-3">
          Ingreso
          <small className="text-gray-400 font-light text-lg">
            Ingresa tu correo electrónico y contraseña
          </small>
        </h2>
        {errorMessage && (
          <ErrorAlert closeAlert={setErrorMessage}>
            {errorMessage}
          </ErrorAlert>
        )}
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            email: '',
          }}
        >
          <Form className="flex flex-col gap-5">
            <Input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className="w-96"
            />

            <div className="w-full flex flex-col gap-2">
              <Button type="submit" color="primary">
                Aceptar
              </Button>
              <Button type="button" color="secondary">
                Volver
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  )
}
