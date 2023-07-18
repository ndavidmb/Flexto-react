import { ValidateError } from '../../shared/errors/validate-error'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { useAuthModelController } from './auth.model.controller'

export const useForgetPasswordViewController = () => {
  const dispatch = useAppDispatch()
  const authModelController = useAuthModelController()

  const sendValidationEmail = async (email: string) => {
    dispatch(setLoading(true))
    try {
      await authModelController.sendRecoveryPasswordEmail(
        email,
      )
      dispatch(
        showToast({
          title:
            'Se envió un correo electrónico para poder restablecer la contraseña',
          details: [
            'Revise en su bandeja de entrada del correo o intente nuevamente',
          ],
          type: 'success',
        }),
      )
      return true
    } catch (err) {
      const errors = []

      if (err instanceof ValidateError) {
        errors.push(err.message)
      }

      dispatch(
        showToast({
          title:
            'No se pudo enviar el correo correctamente',
          details: errors,
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  return { sendValidationEmail }
}
