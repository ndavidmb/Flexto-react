import { documentId, where } from 'firebase/firestore/lite'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import {
  Payment,
  PaymentWithId,
} from '../interfaces/payment.interface'

export const usePaymentRepository = () => {
  const firestore = useFirestore<PaymentWithId>(
    FirestoreTable.PAYMENT,
  )

  const getAllPayments = async () => {
    return await firestore.getAllFirestore()
  }

  const deletePayment = async (id: string) => {
    return await firestore.deleteFirestore(id)
  }

  const updatePayment = async (payment: PaymentWithId) => {
    return await firestore.updateFirestore(
      payment.id,
      payment,
    )
  }

  const createPayment = async (payment: Payment) => {
    return await firestore.addFirestore(payment)
  }

  const getPaymentById = async (id: string) => {
    const payment = await firestore.getById(id)
    return payment
  }

  const getPaymentsByIds = (ids: string[]) => {
    return firestore.getAllFirestore([
      where(documentId(), 'in', ids),
    ])
  }

  return {
    getAllPayments,
    deletePayment,
    createPayment,
    updatePayment,
    getPaymentById,
    getPaymentsByIds,
  }
}
