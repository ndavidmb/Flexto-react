import { OwnerDTO } from '../../owners/interfaces/owner.interface'
import { PaymentWithState } from './payment.interface'

export interface OwnerPaymentsComplete extends OwnerDTO {
  payments: PaymentWithState[]
}
