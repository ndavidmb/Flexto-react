import { FirebaseError } from 'firebase/app'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import {
  PaymentState,
  PaymentWithId,
} from '../interfaces/payment.interface'
import { usePaymentOwnerRepository } from '../repositories/payment-owner.repository'
import { ValidateError } from '../../shared/errors/validate-error'

export const usePaymentOwnerModelController = () => {
  const paymentOwnerRepository = usePaymentOwnerRepository()
  const ownerRepository = useOwnerRepository()

  const getOwnersByPayment = async (
    payment: PaymentWithId,
  ) => {
    try {
      const payments =
        await paymentOwnerRepository.getOwnersByPayment(
          payment,
        )

      const ownerIds = payments.map(
        (payment) => payment.ownerId,
      )

      const owners = await ownerRepository.getOwnersWithIds(
        ownerIds,
      )

      return payments.map((p) => {
        const owner = owners.find(
          (o) => o.id === p.ownerId,
        )!
        const accordingPayment = p.payments.find(
          (ownerPayment) =>
            ownerPayment.paymentId === payment.id,
        )
        return {
          owner,
          payment: accordingPayment!,
        }
      })
    } catch (err) {
      if (
        err instanceof FirebaseError &&
        err.message ===
          "Invalid Query. A non-empty array is required for 'in' filters."
      ) {
        throw new ValidateError(
          'No hay usuarios vinculados a este servicio',
        )
      }

      throw err
    }
  }

  const attachOwnerPayment = async (
    ownerId: string,
    payment: PaymentWithId,
  ) => {
    const existPayment =
      await paymentOwnerRepository.getPaymentByOwner(
        ownerId,
      )

    const newPaymentState = {
      paymentId: payment.id,
      state: PaymentState.PENDING,
    }

    if (!existPayment) {
      return paymentOwnerRepository.createOwnerPayment({
        ownerId,
        payments: [newPaymentState],
      })
    }

    return paymentOwnerRepository.updateOwnerPaymentState({
      id: existPayment.id,
      ownerId,
      payments: [...existPayment.payments, newPaymentState],
    })
  }

  return {
    getOwnersByPayment,
    attachOwnerPayment,
  }
}