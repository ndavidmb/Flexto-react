import { PaymentSelectedIds } from '../interfaces/payment-form'
import {
  OwnerPayment,
  OwnerPaymentWithId,
  PaymentState,
  PaymentWithId,
} from '../interfaces/payment.interface'

export class ParsePaymentArrays {
  static parseRelevantPaymentOperations(
    ownerIds: PaymentSelectedIds[],
    bdRegisters: OwnerPaymentWithId[],
    formPayment: PaymentWithId,
  ) {
    const { selected, noSelected } =
      ParsePaymentArrays.sortSelectedOwnerIds(ownerIds)

    const {
      deleteCompletely,
      updatePayments: updateRemovingPayment,
    } = ParsePaymentArrays.checkDeleteCompletelyOrJustPayment(
      noSelected,
      bdRegisters,
      formPayment,
    )

    const {
      addPayments,
      updatePayments: updateWithNewPayment,
    } = ParsePaymentArrays.checkToAddRegisterOrUpdateExisting(
      selected,
      bdRegisters,
      formPayment,
    )

    return {
      toDeleteIds: deleteCompletely,
      toAdd: addPayments,
      toUpdate: [
        ...updateRemovingPayment,
        ...updateWithNewPayment,
      ],
    }
  }

  static sortSelectedOwnerIds(
    ownerIds: PaymentSelectedIds[],
  ) {
    return ownerIds.reduce(
      (prev, current) => {
        const key = current.selected
          ? 'selected'
          : 'noSelected'
        return {
          ...prev,
          [key]: [...prev[key], current.ownerId],
        }
      },
      {
        selected: [] as string[],
        noSelected: [] as string[],
      },
    )
  }

  static checkDeleteCompletelyOrJustPayment(
    noSelectedOwnerIds: string[],
    bdRegisters: OwnerPaymentWithId[],
    formPayment: PaymentWithId,
  ) {
    const deleteCompletely: string[] = []
    const updatePayments: OwnerPaymentWithId[] = []

    noSelectedOwnerIds.forEach((ownerId) => {
      const register = bdRegisters.find(
        (register) => register.ownerId === ownerId,
      )

      if (!register) {
        return
      }

      const newPayments = register.payments.filter(
        (reg) => reg.paymentId !== formPayment.id,
      )

      if (newPayments.length === 0) {
        // Delete the relation because the owner has not payments
        deleteCompletely.push(register.id)
        return
      }

      // Delete just the payment because the owner has other payments related to them
      const updatedRegister: OwnerPaymentWithId = {
        ...register,
        payments: newPayments,
      }
      updatePayments.push(updatedRegister)
    })

    return { deleteCompletely, updatePayments }
  }

  static checkToAddRegisterOrUpdateExisting(
    selectedOwnerIds: string[],
    bdRegisters: OwnerPaymentWithId[],
    formPayment: PaymentWithId,
  ) {
    const addPayments: OwnerPayment[] = []
    const updatePayments: OwnerPaymentWithId[] = []

    selectedOwnerIds.forEach((ownerId) => {
      const register = bdRegisters.find(
        (reg) => reg.ownerId === ownerId,
      )

      // Add the register if it doesn't exist
      if (!register) {
        addPayments.push({
          ownerId,
          payments: [
            {
              paymentId: formPayment.id,
              state: PaymentState.PENDING,
            },
          ],
        })
        return
      }

      // Validate already existing payment
      if (
        register.payments.some(
          (pay) => pay.paymentId === formPayment.id,
        )
      ) {
        return
      }

      // Update the payment with the new payment state
      const updated = {
        ...register,
        payments: [
          ...register.payments,
          {
            paymentId: formPayment.id,
            state: PaymentState.PENDING,
          },
        ],
      }
      updatePayments.push(updated)
    })

    return { addPayments, updatePayments }
  }
}
