import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'
import { ValidateError } from '../../shared/errors/validate-error'
import { ToastType } from '../../shared/store/slices/toast/toastSlice'

export const validateFormat = (error: unknown) => {
  if (
    error instanceof ValidateError &&
    error.message === 'incorrect_format'
  ) {
    return {
      title:
        'Formato de archivo incorrecto, los archivos permitidos son',
      details: ['.pdf', '.docx'],
      type: 'warning' as ToastType,
    }
  }

  return {
    title: 'No se pudo subir el acta',
    details: [SUPPORT_MESSAGES.TRY_LATER],
    type: 'error' as ToastType,
  }
}
