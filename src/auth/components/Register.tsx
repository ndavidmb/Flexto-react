import { Form, Formik, FormikProps } from 'formik'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'
import { InputFile } from '../../shared/styled-components/InputFile'
import { useRegister } from '../hooks/useRegister'
import { IRegisterForm } from '../interfaces/register-form.interface'
import { useNavigate } from 'react-router-dom'

// TODO: Add required to photo
export const Register = () => {
  const {
    handleSubmit,
    initialValue,
    setPhoto,
    registerSchema,
  } = useRegister()

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
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
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValue}
          validationSchema={registerSchema}
        >
          {({ errors }: FormikProps<IRegisterForm>) => (
            <div className="relative">
              <Form className="flex flex-col gap-4">
                <div className="flex gap-1">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Nombres*"
                    className="w-60"
                  />

                  <Input
                    name="surnames"
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
                  <Button
                    onClick={handleBack}
                    type="button"
                    color="secondary"
                  >
                    Volver
                  </Button>
                </div>
              </Form>

              {Object.values(errors).length > 0 && (
                <div className="absolute w-64 bg-yellow-300 rounded shadow border p-3 right-[-20em] top-[-5em]">
                  <h2 className="text-yellow-900 font-bold">
                    Requerimientos:
                  </h2>
                  {Object.values(errors).map(
                    (error, index) => (
                      <li
                        className="break-words"
                        key={index}
                      >
                        {error}
                      </li>
                    ),
                  )}
                </div>
              )}
            </div>
          )}
        </Formik>
      </div>
    </section>
  )
}
