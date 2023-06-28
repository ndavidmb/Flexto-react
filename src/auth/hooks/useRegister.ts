import { useState } from 'react'
import * as yup from 'yup'
import { useAppDispatch } from '../../shared/store/hooks'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { useAuthController } from '../controllers/auth.controller'
import { IRegisterForm } from '../interfaces/register-form.interface'
import { UserRoles } from '../interfaces/user-roles.enums'

export const useRegister = () => {
  const dispatch = useAppDispatch()

  const [photo, setPhoto] = useState<null | {
    blob: Blob
    name: string
  }>(null)

  const authController = useAuthController()

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
    role: UserRoles.CLIENT,
  }

  const handleSubmit = async ({
    email,
    name,
    surnames,
    password,
    role,
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
      displayName: `${name} ${surnames}`,
      photo,
      role,
    })
  }

  return {
    setPhoto,
    registerSchema,
    initialValue,
    handleSubmit,
  }
}
