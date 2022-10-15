import { Form, Formik } from 'formik'
import { useEffect } from 'react'
import { IoLogoGoogle } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoadingSvg } from '../shared/components/Loading/Loading'
import { useAppDispatch } from '../shared/store/hooks'
import { hideError } from '../shared/store/slices/auth/authSlice'
import {
  emailAndPasswordSignIn,
  startGoogleSignIn,
} from '../shared/store/slices/auth/thunks'
import { RootState } from '../shared/store/store'
import { Button } from '../shared/styled-components/Button'
import { ErrorAlert } from '../shared/styled-components/ErrorAlert'
import { Input } from '../shared/styled-components/Input/Input'

export const AuthWrapper = () => {
  const { errorMessage, email } = useSelector(
    (state: RootState) => state.authState,
  )
  const { loading } = useSelector(
    (state: RootState) => state.loadingState,
  )

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const handleSubmit = (values: {
    email: string
    password: string
  }) => {
    dispatch(emailAndPasswordSignIn(values))
  }

  const handleGoogle = () => {
    dispatch(startGoogleSignIn())
  }

  useEffect(() => {
    if (email) {
      navigate('home/owners')
    }
  }, [email])

  const closeAlert = () => {
    dispatch(hideError())
  }

  return (
    <>
      {loading && <LoadingSvg />}

      <section className="flex flex-col gap-4 justify-center items-center bg-gray-100 w-full h-screen">
        <div className="bg-white flex flex-col p-8 gap-2 rounded shadow">
          <h2 className="font-semibold text-2xl flex flex-col items-center mb-3">
            Ingreso
            <small className="text-gray-400 font-light text-lg">
              Ingresa tu correo electrónico y contraseña
            </small>
          </h2>
          {errorMessage && (
            <ErrorAlert closeAlert={closeAlert}>
              {errorMessage}
            </ErrorAlert>
          )}
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
                  onClick={handleGoogle}
                  type="button"
                  className="flex gap-1"
                  color="secondary"
                >
                  <IoLogoGoogle />
                  Ingresar con Google
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
    </>
  )
}
