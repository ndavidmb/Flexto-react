import { Form, Formik, FormikProps } from 'formik'
import { useState } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { Input } from '../../shared/styled-components/Input'
import { InputFile } from '../../shared/styled-components/InputFile'
import * as yup from 'yup'
import { IRegisterForm } from '../interfaces/register-form.interface'
import { ErrorRegisterAlert } from './ErrorRegisterAlert'
import { AuthController } from '../controllers/auth.controller'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { useAppDispatch } from '../../shared/store/hooks'
import { login } from '../../shared/store/slices/auth/authSlice'
import { FirebaseError } from 'firebase/app'
import { FIREBASE_ERRORS } from '../../shared/constants/firebase-errors.constants'
import { ALERT_MESSAGES } from '../../shared/constants/alert-messages.constants'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const { theme } = useSelector(
    (state: RootState) => state.themeState,
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [photo, setPhoto] = useState<null | {
    blob: Blob
    name: string
  }>(null)

  const authController = AuthController(theme?.id ?? '')

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, 'El nombre es demasiado corto')
      .required('El nombre es requerido'),
    surnames: yup
      .string()
      .min(2, 'Demasiado corto')
      .required('Los apellidos son requerido'),
    email: yup
      .string()
      .email('El correo electrónico no es valido')
      .required('El email es requerido'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
      )
      .required('La contraseña es requerida'),
    passwordRepeated: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'Las contraseñas no coinciden',
      )
      .required('Por favor confirme la contraseña'),
  })

  const initialValue: IRegisterForm = {
    name: '',
    surnames: '',
    email: '',
    password: '',
    passwordRepeated: '',
    role: 'client',
  }

  const handleSubmit = ({
    email,
    name,
    surnames,
    password,
    role,
  }: IRegisterForm) => {
    if (!photo) {
      return
    }

    authController
      .register({
        email,
        password,
        displayName: `${name} ${surnames}`,
        photo,
        role,
      })
      .then((res) => {
        if (res) {
          dispatch(login(res.user))
          navigate('../home/owners')
        }
      })
      .catch((err) => {
        if (err instanceof FirebaseError) {
          // TODO: Alert to show exact error
          console.log(ALERT_MESSAGES[err.code])
        }
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

                  <ErrorRegisterAlert
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </section>
  )
}
