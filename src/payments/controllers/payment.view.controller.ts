import { useEmail } from '../../auth/hooks/useEmail'
import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { Payment } from '../interfaces/payment.interface'
import { usePaymentModelController } from './payment.model.controller'

export const usePaymentViewController = () => {
  const dispatch = useAppDispatch()
  const paymentModelController = usePaymentModelController()
  const emailFb = useEmail()

  const getAllPayments = async () => {
    dispatch(setLoading(true))
    try {
      return await paymentModelController.getAllPayments()
    } catch {
      dispatch(
        showToast({
          title: 'No se pudieron obtener los servicios',
          details: [],
          type: 'error',
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deletePayment = async (id: string) => {
    dispatch(setLoading(true))
    try {
      await paymentModelController.deletePayment(id)
      return true
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo eliminar el servicio',
          details: [],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const createPayment = async (payment: Payment) => {
    dispatch(setLoading(true))
    try {
      await paymentModelController.createPayment(payment)
      return true
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo crear el servicio',
          details: [],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updatePayment = async (
    id: string,
    payment: Payment,
  ) => {
    const paymentWithId = {
      ...payment,
      id,
    }
    dispatch(setLoading(true))
    try {
      await paymentModelController.updatePayment(
        paymentWithId,
      )
      return true
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo actualizar el servicio',
          details: [],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getPaymentById = async (paymentId: string) => {
    dispatch(setLoading(true))

    try {
      return await paymentModelController.getPaymentById(
        paymentId,
      )
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo obtener el servicio',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )

      return null
    } finally {
      dispatch(setLoading(false))
    }
  }

  const sentUserEmail = async (
    email: string,
    message: string,
  ) => {
    try {
      await emailFb.sendEmail({
        email,
        subject:
          'El administrador le ha enviado un mensaje',
        body: message,
      })
      dispatch(
        showToast({
          title: 'Se ha enviado el mensaje correctamente',
          details: [],
          type: 'success',
        }),
      )
      return true
    } catch {
      dispatch(
        showToast({
          title: 'No se ha podido enviar el email',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    }
  }

  return {
    getAllPayments,
    createPayment,
    updatePayment,
    deletePayment,
    getPaymentById,
    sentUserEmail,
  }
}
