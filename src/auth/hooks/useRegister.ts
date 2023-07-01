import { useState } from 'react'
import * as yup from 'yup'
import { useAppDispatch } from '../../shared/store/hooks'
import { showToast } from '../../shared/store/slices/toast/toastSlice'

import { IRegisterForm } from '../interfaces/register-form.interface'
import { UserRoles } from '../interfaces/user-roles.enums'
import { useAuthDefaultController } from './useAuthDefaultController'

export const useRegister = () => {
  const dispatch = useAppDispatch()

  const [photo, setPhoto] = useState<null | {
    blob: Blob
    name: string
  }>(null)

  const { authController } = useAuthDefaultController()

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, 'El nombre es demasiado corto')
      .required('El nombre es requerido'),
    surnames: yup
      .string()
      .min(2, 'Demasiado corto')
      .required('Los apellidos son requeridos'),
    email: yup
      .string()
      .email('El correo electrónico no es valido')
      .required('El email es requerido'),
    phoneNumber: yup
      .number()
      .required('El número de contacto es requerido'),
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
    requestDescription: yup
      .string()
      .required(
        'El detalle es importante para poder informar al administrador cual va a ser el uso del usuario',
      ),
  })

  const initialValue: IRegisterForm = {
    name: '',
    surnames: '',
    email: '',
    password: '',
    passwordRepeated: '',
    phoneNumber: '',
    requestDescription: '',
    role: UserRoles.CLIENT,
  }

  const handleSubmit = async ({
    email,
    name,
    surnames,
    password,
    role,
    phoneNumber,
    requestDescription,
  }: IRegisterForm) => {
    if (!photo) {
      dispatch(
        showToast({
          title: 'La imagen es requerida',
          details: [],
          type: 'info',
        }),
      )
      return
    }

    await authController.register({
      email,
      password,
      phoneNumber,
      displayName: `${name} ${surnames}`,
      photo,
      role,
      requestDescription,
    })
  }

  return {
    setPhoto,
    registerSchema,
    initialValue,
    handleSubmit,
  }
}
