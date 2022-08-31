import { Form, Formik } from 'formik'
import { useState } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { ErrorAlert } from '../../shared/styled-components/ErrorAlert'
import { Input } from '../../shared/styled-components/Input'
import { InputFile } from '../../shared/styled-components/InputFile'
import { useAuthService } from '../services/auth.service'

interface RegisterForm {
  name: string
  lastname: string
  email: string
  password: string
  passwordRepeated: string
  role: 'admin' | 'client'
}

export const Register = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [photo, setPhoto] = useState<null | {
    blob: Blob,
    name: string
  }>(null)
  const authService = useAuthService()

  const initialValue: RegisterForm = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    passwordRepeated: '',
    role: 'client',
  }

  const handleSubmit = ({
    email,
    name,
    lastname,
    password,
    passwordRepeated,
    role,
  }: RegisterForm) => {
    if (password !== passwordRepeated) {
      return setErrorMessage(
        'Las contraseñas no coinciden.',
      )
    }

    if (!photo) {
      return setErrorMessage('La imagen es requerida')
    }

    authService
      .registerUserFirebase({
        email,
        password,
        displayName: `${name} ${lastname}`,
        photo,
        role,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
          initialValues={initialValue}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex gap-1">
              <Input
                name="name"
                type="text"
                placeholder="Nombres*"
                className="w-60"
              />

              <Input
                name="lastname"
                type="text"
                placeholder="Apellidos*"
                className="w-60"
              />
            </div>

            <Input
              name="email"
              type="email"
              placeholder="Correo electrónico*"
              className="w-full"
            />

            <div className="flex gap-1">
              <Input
                name="password"
                type="password"
                placeholder="Contraseña*"
                className="w-60"
              />

              <Input
                name="passwordRepeated"
                type="password"
                placeholder="Repetir contraseña*"
                className="w-60"
              />
            </div>

            <InputFile
              className="w-full"
              id="photo"
              onChange={(value) => {
                setPhoto(value)
              }}
            />

            <div className="w-full flex flex-col gap-2">
              <Button type="submit" color="primary">
                Registrarse
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
