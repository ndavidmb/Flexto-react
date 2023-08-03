import { FirebaseError } from 'firebase/app'
import { useEmail } from '../../auth/hooks/useEmail'
import { useOwnerRepository } from '../../owners/repositories/owner.repository'
import { ValidateError } from '../../shared/errors/validate-error'
import { PaymentSelectedIds } from '../interfaces/payment-form'
import {
  OwnerPaymentWithId,
  PaymentState,
  PaymentWithId,
} from '../interfaces/payment.interface'
import { usePaymentOwnerRepository } from '../repositories/payment-owner.repository'
import { ParsePaymentArrays } from '../utils/parse-payments-arrays'

export const usePaymentOwnerModelController = () => {
  const email = useEmail()
  const paymentOwnerRepository = usePaymentOwnerRepository()
  const ownerRepository = useOwnerRepository()

  const getOwnersByPayment = async (paymentId: string) => {
    try {
      const payments =
        await paymentOwnerRepository.getOwnersByPayment(
          paymentId,
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
            ownerPayment.paymentId === paymentId,
        )
        return {
          id: p.id,
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

    const owners = await ownerRepository.getActiveOwners()
    const emails = Object.values(operations)
      .flat()
      .map(
        (owner) =>
          owners.find((own) => owner.ownerId === own.id)!
            .email,
      )

    email.sendBulkEmails(emails, {
      subject: 'Actualización de estado FlexTo',
      body: `<p>Se acaba de actualizar su estado en el servicio <b>${formPayment.description}</b> entre a la app para revisar su estado actual, en la pestaña de <b>servicios</b>. </p>`,
    })
  }

  const updateOwnerState = async (
    payment: PaymentWithId,
    newState: PaymentState,
    owner: OwnerPaymentWithId,
  ) => {
    await paymentOwnerRepository.updateOwnerPaymentState(
      owner,
    )

    const completeOwner =
      await ownerRepository.getOwnerById(owner.ownerId)

    email.sendEmail({
      email: completeOwner.email,
      subject: 'Actualización de estado FlexTo',
      body: `<p>Se acaba de actualizar su estado a <b>${
        newState === PaymentState.PAID
          ? 'Pagó'
          : 'Pendiente'
      }</b> en el servicio <b>${
        payment.description
      }</b> entre a la app para verificar su estado actual.</p>`,
    })
  }

  const getOwnerPaymentByOwnerId = async (
    ownerId: string,
  ) => {
    return await paymentOwnerRepository.getPaymentByOwner(
      ownerId,
    )
  }

  const getAllOwnerPayments = async (paymentId: string) => {
    const all =
      await paymentOwnerRepository.getAllOwnersPayment()

    return all.filter((op) =>
      op.payments.some((p) => p.paymentId === paymentId),
    )
  }

  const resetUserStates = async (paymentId: string) => {
    const activeOwners = await getAllOwnerPayments(
      paymentId,
    )

    const toUpdate = activeOwners.map((paymentOwners) => ({
      ...paymentOwners,
      payments: paymentOwners.payments.map((p) =>
        p.paymentId === paymentId
          ? { ...p, state: PaymentState.PENDING }
          : p,
      ),
    }))

    await paymentOwnerRepository.updateBulkStates(toUpdate)
  }

  return {
    getOwnersByPayment,
    attachOwnerPayment,
    updateOwnerState,
    getOwnerPaymentByOwnerId,
    resetUserStates,
  }
}
