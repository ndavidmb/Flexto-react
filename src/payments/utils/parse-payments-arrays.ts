import { PaymentSelectedIds } from '../interfaces/payment-form'
import {
  OwnerPaymentWithId,
  PaymentWithId,
} from '../interfaces/payment.interface'

function toEdit(
  existing: OwnerPaymentWithId[],
  selected: PaymentSelectedIds[],
  currentPayment: PaymentWithId,
) {
  existing.map((existingOwnerPayment) => {
    const ownerPaymentToUpdate = selected.find(
      (selectedOption) =>
        selectedOption.selected &&
        selectedOption.ownerId ===
          existingOwnerPayment.ownerId,
    )
  })
}
