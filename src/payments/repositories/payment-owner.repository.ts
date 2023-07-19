import { where } from 'firebase/firestore/lite'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import {
  OwnerPayment,
  OwnerPaymentWithId,
  Payment,
  PaymentWithId,
} from '../interfaces/payment.interface'

export const usePaymentOwnerRepository = () => {
  const firestore = useFirestore<OwnerPayment>(
    FirestoreTable.OWNER_PAYMENT,
  )

  const getAllOwnersPayment = () => {
    return firestore.getAllFirestore()
  }

  const updateOwnerPaymentState = (
    ownerPayment: OwnerPaymentWithId,
  ) => {
    return firestore.updateFirestore(
      ownerPayment.id,
      ownerPayment,
    )
  }

  const deleteOwnerPayment = (id: string) => {
    return firestore.deleteFirestore(id)
  }

  const createOwnerPayment = (
    ownerPayment: OwnerPayment,
  ) => {
    return firestore.addFirestore(ownerPayment)
  }

  const getOwnersByPayment = (payment: PaymentWithId) => {
    return firestore.getAllFirestore([
      where('payments', 'array-contains', payment.id),
    ])
  }

  const getPaymentByOwner = async (ownerId: string) => {
    const [owner] = await firestore.getByParam(
      'ownerId',
      ownerId,
    )
    return owner as OwnerPaymentWithId
  }

  return {
    deleteOwnerPayment,
    updateOwnerPaymentState,
    createOwnerPayment,
    getAllOwnersPayment,
    getOwnersByPayment,
    getPaymentByOwner,
  }
}
