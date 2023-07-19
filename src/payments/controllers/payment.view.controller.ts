import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import {
  Payment,
  PaymentWithId,
} from '../interfaces/payment.interface'
import { usePaymentOwnerModelController } from './payment-owner.model.controller'
import { usePaymentModelController } from './payment.model.controller'

export const usePaymentViewController = () => {
  const dispatch = useAppDispatch()
  const paymentModelController = usePaymentModelController()
  const paymentOwnerModelController =
    usePaymentOwnerModelController()

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

  const createPaymentState = async (
    ownerId: string,
    payment: PaymentWithId,
  ) => {
    dispatch(setLoading(true))
    try {
      await paymentOwnerModelController.attachOwnerPayment(
        ownerId,
        payment,
      )
      return true
    } catch {
      dispatch(
        showToast({
          title:
            'Se agrego correctamente el servicio al usuario',
          details: [],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    getAllPayments,
    createPayment,
    updatePayment,
    deletePayment,
    createPaymentState,
  }
}
