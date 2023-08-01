import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'
import { ValidateError } from '../../shared/errors/validate-error'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { PaymentSelectedIds } from '../interfaces/payment-form'
import {
  OwnerPaymentVm,
  PaymentState,
  PaymentWithId,
} from '../interfaces/payment.interface'
import { usePaymentOwnerModelController } from './payment-owner.model.controller'

export const usePaymentOwnerViewController = () => {
  const dispatch = useAppDispatch()

  const paymentOwnerModelController =
    usePaymentOwnerModelController()

  const attachOwnerPayment = async (
    ownerIds: PaymentSelectedIds[],
    payment: PaymentWithId,
  ) => {
    dispatch(setLoading(true))
    try {
      await paymentOwnerModelController.attachOwnerPayment(
        ownerIds,
        payment,
      )
      return true
    } catch (err) {
      console.error(err)
      dispatch(
        showToast({
          title:
            'No se pudo vincular el servicio al usuario',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getAllOwnersByPaymentId = async (
    paymentId: string,
  ) => {
    dispatch(setLoading(true))
    try {
      const ownerPayments =
        await paymentOwnerModelController.getOwnersByPayment(
          paymentId,
        )

      const res: OwnerPaymentVm[] = ownerPayments.map(
        (op) => ({
          ...op.owner,
          ...op.payment,
          id: op.id,
          ownerId: op.owner.id,
        }),
      )
      return res
    } catch (error) {
      if (error instanceof ValidateError) {
        dispatch(
          showToast({
            title: error.message,
            details: [
              'Puede vincular nuevos usuarios en el botón de arriba',
            ],
            type: 'warning',
          }),
        )
        return []
      }

      console.error(error)
      dispatch(
        showToast({
          title: 'No se pudieron obtener los propietarios',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const updateOwnerState = async (
    ownerPayment: OwnerPaymentVm,
    payment: PaymentWithId,
    newState: PaymentState,
  ) => {
    dispatch(setLoading(true))
    try {
      const bdRegister =
        await paymentOwnerModelController.getOwnerPaymentByOwnerId(
          ownerPayment.ownerId!,
        )
      await paymentOwnerModelController.updateOwnerState(payment, newState, {
        ...bdRegister,
        payments: bdRegister.payments.map((rg) =>
          rg.paymentId === payment.id
            ? { ...rg, state: newState }
            : rg,
        ),
      })

      dispatch(
        showToast({
          title: `Se actualizó correctamente el estado`,
          details: [
            `Se actualizó el estado de ${ownerPayment.displayName} correctamente`,
          ],
          type: 'success',
        }),
      )
      return true
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo cambiar el estado del usuario',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const resetUserStates = async (
    paymentId: string,
  ) => {
    dispatch(setLoading(true))

    try {
      await paymentOwnerModelController.resetUserStates(
        paymentId,
      )
      return true
    } catch {
      dispatch(
        showToast({
          title:
            'No se pudieron restablecer los estados de los usuarios',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    attachOwnerPayment,
    getAllOwnersByPaymentId,
    updateOwnerState,
    resetUserStates,
  }
}
