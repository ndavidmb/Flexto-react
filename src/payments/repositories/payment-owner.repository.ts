import { where } from 'firebase/firestore/lite'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { useFirestoreBulk } from '../../shared/hooks/useFirestoreBulk'
import {
  OwnerPayment,
  OwnerPaymentWithId
} from '../interfaces/payment.interface'

export const usePaymentOwnerRepository = () => {
  const firestore = useFirestore<OwnerPayment>(
    FirestoreTable.OWNER_PAYMENT,
  )

  const firestoreBulk =
    useFirestoreBulk<OwnerPaymentWithId>(
      FirestoreTable.OWNER_PAYMENT,
    )

  const getAllOwnersPayment = async () => {
    const all = await firestore.getAllFirestore()
    return all as OwnerPaymentWithId[]
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

  const getOwnersByPayment = async (paymentId: string) => {
    const data = await firestore.getAllFirestore()
    console.log(data);

    return data.filter((element) =>
      element.payments.some(
        (payment) => payment.paymentId === paymentId,
      ),
    )
  }

  const getPaymentsByOwners = (ownersIds: string[]) => {
    return firestore.getAllFirestore([
      where('ownerId', 'in', ownersIds),
    ])
  }

  const getPaymentByOwner = async (ownerId: string) => {
    const [owner] = await firestore.getByParam(
      'ownerId',
      ownerId,
    )
    return owner as OwnerPaymentWithId
  }

  const bulkOperations = async ({
    toDeleteIds,
    toUpdate,
    toAdd,
  }: {
    toDeleteIds: string[]
    toUpdate: OwnerPaymentWithId[]
    toAdd: OwnerPayment[]
  }) => {
    const batch = firestoreBulk.getBatch()

    firestoreBulk.bulkCreate(batch, toAdd)
    firestoreBulk.bulkUpdate(batch, toUpdate, 'id')
    firestoreBulk.bulkDelete(batch, toDeleteIds)

    return firestoreBulk.commitBatch(batch)
  }

  return {
    deleteOwnerPayment,
    updateOwnerPaymentState,
    createOwnerPayment,
    getAllOwnersPayment,
    getOwnersByPayment,
    getPaymentByOwner,
    getPaymentsByOwners,
    bulkOperations,
  }
}
