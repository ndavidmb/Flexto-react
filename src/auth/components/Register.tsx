import { Form, Formik, FormikProps } from 'formik'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'
import { InputFile } from '../../shared/styled-components/InputFile'
import { IRegisterForm } from '../interfaces/register-form.interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { useRegister } from '../hooks/useRegister'

export const Register = () => {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const {
    handleSubmit,
    initialValue,
    setPhoto,
    registerSchema,
  } = useRegister(theme)

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
          {({
            touched,
            errors,
          }: FormikProps<IRegisterForm>) => (
            <>
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
                  <Button type="button" color="secondary">
                    Volver
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </section>
  )
}
