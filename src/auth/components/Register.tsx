import { Form, Formik, FormikProps } from 'formik'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'
import { InputFile } from '../../shared/styled-components/InputFile'
import { useRegister } from '../hooks/useRegister'
import { IRegisterForm } from '../interfaces/register-form.interface'
import { useNavigate } from 'react-router-dom'
import { Label } from '../../shared/styled-components/Label'
import { TextArea } from '../../shared/styled-components/TextArea'

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
      <div className="bg-white flex flex-col p-8 gap-2 rounded shadow w-1/2">
        <h2 className="font-semibold text-2xl flex flex-col items-center mb-3">
          Registro
          <small className="text-gray-400 font-light text-lg">
            Diligencie todos los datos requeridos
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
                  <div className="w-1/2 flex flex-col gap-1">
                    <Label htmlFor="name" required={true}>
                      Nombres
                    </Label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Nombres"
                    />
                  </div>

                  <div className="w-1/2 flex flex-col gap-1">
                    <Label
                      htmlFor="surnames"
                      required={true}
                    >
                      Apellidos
                    </Label>
                    <Input
                      name="surnames"
                      type="text"
                      placeholder="Apellidos"
                    />
                  </div>
                </div>

                <div className="flex gap-1">
                  <div className="w-1/2 flex flex-col gap-1">
                    <Label htmlFor="email" required={true}>
                      Email
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Correo electrónico*"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-1">
                    <Label htmlFor="email" required={true}>
                      Número de contacto
                    </Label>
                    <Input
                      type="number"
                      placeholder="Número de contacto"
                      name="phoneNumber"
                    />
                  </div>
                </div>

                <div className="flex gap-1">
                  <div className="w-1/2 flex flex-col gap-1">
                    <Label
                      htmlFor="password"
                      required={true}
                    >
                      Contraseña
                    </Label>

                    <Input
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                    />
                  </div>

                  <div className="w-1/2 flex flex-col gap-1">
                    <Label
                      htmlFor="password"
                      required={true}
                    >
                      Repetir contraseña
                    </Label>
                    <Input
                      name="passwordRepeated"
                      type="password"
                      placeholder="Repetir contraseña"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="requestDescription"
                    required={true}
                  >
                    Detalles
                  </Label>
                  <TextArea
                    placeholder="Detalles de la solicitud (Ej. Número de apartamento y torre a la cuál va a hacer uso)"
                    name="requestDescription"
                    rows={3}
                  />
                </div>

                <InputFile
                  className="w-full"
                  placeholder="Subir imagen de usuario"
                  id="photo"
                  onChange={(value) => {
                    setPhoto(value)
                  }}
                />
                <div className="w-full flex gap-1 justify-end">
                  <Button
                    onClick={handleBack}
                    type="button"
                    color="secondary"
                  >
                    Volver
                  </Button>
                  <Button type="submit" color="primary">
                    Registrarse
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
