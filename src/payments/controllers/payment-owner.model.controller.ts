import { FirebaseError } from 'firebase/app'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { ValidateError } from '../../shared/errors/validate-error'
import { PaymentSelectedIds } from '../interfaces/payment-form'
import { PaymentWithId } from '../interfaces/payment.interface'
import { usePaymentOwnerRepository } from '../repositories/payment-owner.repository'
import { ParsePaymentArrays } from '../utils/parse-payments-arrays'

export const usePaymentOwnerModelController = () => {
  const paymentOwnerRepository = usePaymentOwnerRepository()
  const ownerRepository = useOwnerRepository()

  const getOwnersByPayment = async (paymentId: string) => {
    try {
      const payments =
        await paymentOwnerRepository.getOwnersByPayment(
          paymentId,
        )

      console.log(payments)

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
            ownerPayment.paymentId === paymentId,
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
    ownerIds: PaymentSelectedIds[],
    formPayment: PaymentWithId,
  ) => {
    const bdOwnerPayments =
      await paymentOwnerRepository.getAllOwnersPayment()

    const operations =
      ParsePaymentArrays.parseRelevantPaymentOperations(
        ownerIds,
        bdOwnerPayments,
        formPayment,
      )

    await paymentOwnerRepository.bulkOperations(operations)
  }

  return {
    getOwnersByPayment,
    attachOwnerPayment,
  }
}
