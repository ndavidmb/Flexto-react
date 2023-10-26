import { OwnerDTO } from '../../owners/interfaces/owner.interface'

export enum PaymentState {
  PAID = 1,
  PENDING = 2,
}

export interface Payment {
  description: string
  price: number
}

export interface PaymentWithId extends Payment {
  id: string
}

export interface PaymentWithState {
  id: string
  description: string
  price: string
  state: string
}

export interface OwnerPayment {
  ownerId: string
  payments: {
    state: PaymentState
    paymentId: string
  }[]
}

export interface OwnerPaymentWithId extends OwnerPayment {
  id: string
}

export interface PaymentsWithState {
  state: PaymentState
  paymentId: string
}

export interface OwnerPaymentVm
  extends OwnerDTO,
    PaymentsWithState {
  ownerId: string | undefined
}

export interface OwnerPaymentWithStateName
  extends OwnerPaymentVm {
  stateName: string
}

export const PAYMENT_TYPE_LABELS = {
  [PaymentState.PAID]: 'Pagó',
  [PaymentState.PENDING]: 'Pendiente',
}
