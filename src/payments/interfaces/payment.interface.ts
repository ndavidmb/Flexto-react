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

export interface PaymentWithState extends Payment {
  state: PaymentState
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
