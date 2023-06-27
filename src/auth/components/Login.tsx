import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../shared/store/hooks'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'
import { useAuthController } from '../controllers/auth.controller'

export const Login = () => {
  const navigate = useNavigate()
  const authController = useAuthController()

  const handleSubmit = async (values: {
    email: string
    password: string
  }) => {
    await authController.signIn(values)
  }

  const handleRegister = () => {
    navigate('register')
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
          initialValues={{
            email: '',
            password: '',
          }}
        >
          <Form className="flex flex-col gap-5">
            <Input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className="w-96"
            />
            <Input
              name="password"
              type="password"
              placeholder="Contraseña"
              className="w-96"
            />

            <div className="w-full flex flex-col gap-2">
              <Button type="submit" color="primary">
                Ingresar
              </Button>

              <Button
                type="button"
                color="secondary"
                onClick={handleRegister}
              >
                Registrarse
              </Button>
            </div>
          </Form>
        </Formik>
      </div>

      <p className="text-gray-500">
        ¿Olvido su contraseña?&nbsp;
        <Button color="link">Click aquí</Button>
      </p>
    </section>
  )
}
