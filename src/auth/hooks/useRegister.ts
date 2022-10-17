import { useAuthController } from '../controllers/auth.controller'
import { useState } from 'react'
import * as yup from 'yup'
import { useAppDispatch } from '../../shared/store/hooks'
import { login } from '../../shared/store/slices/auth/authSlice'
import { FirebaseError } from 'firebase/app'
import { ALERT_MESSAGES } from '../../shared/constants/alert-messages.constants'
import { useNavigate } from 'react-router-dom'
import { Theme } from '../../customizations/interfaces/theme.interface'
import { IRegisterForm } from '../interfaces/register-form.interface'

export const useRegister = (theme: Theme | null) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [photo, setPhoto] = useState<null | {
    blob: Blob
    name: string
  }>(null)

  const authController = useAuthController(theme?.id ?? '')

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

  return {
    setPhoto,
    registerSchema,
    initialValue,
    handleSubmit,
  }
}
