import {
  Payment,
  PaymentWithId,
} from '../interfaces/payment.interface'
import { usePaymentRepository } from '../repositories/payment.repository'

export const usePaymentModelController = () => {
  const paymentRepository = usePaymentRepository()

  const getAllPayments = async () => {
    return paymentRepository.getAllPayments()
  }

  const updatePayment = async (payment: PaymentWithId) => {
    return paymentRepository.updatePayment(payment)
  }

  const deletePayment = async (id: string) => {
    return paymentRepository.deletePayment(id)
  }

  const createPayment = async (payment: Payment) => {
    return paymentRepository.createPayment(payment)
  }

  return {
    getAllPayments,
    createPayment,
    updatePayment,
    deletePayment,
  }
}
