import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useModal } from '../../shared/hooks/useModal'
import { PaymentAddUserForm } from '../components/PaymentAddUserForm'
import { PaymentUserList } from '../components/PaymentUserList'
import { usePaymentOwnerViewController } from '../controllers/payment-owner.view.controller'
import { usePaymentViewController } from '../controllers/payment.view.controller'
import { PaymentSelectedIds } from '../interfaces/payment-form'
import {
  OwnerPaymentVm,
  PaymentWithId,
} from '../interfaces/payment.interface'

export const PaymentUserPage = () => {
  const [owners, setOwners] = useState<OwnerPaymentVm[]>([])
  const { closeModal, isOpen, data, openModal, setData } =
    useModal<string[]>()
  const [payment, setPayment] =
    useState<PaymentWithId | null>(null)
  const [allOwners, setAllOwners] = useState<
    OwnerPaymentVm[]
  >([])

  const { paymentId } = useParams()

  const paymentOwnerViewController =
    usePaymentOwnerViewController()

  const paymentViewController = usePaymentViewController()
  const ownerPaymentViewController =
    usePaymentOwnerViewController()

  useEffect(() => {
    if (paymentId) {
      paymentOwnerViewController
        .getAllOwnersByPaymentId(paymentId)
        .then((res) => {
          setOwners(res)
          setAllOwners(res)
        })
      paymentViewController
        .getPaymentById(paymentId)
        .then((payment) => {
          setPayment(payment)
        })
    }
  }, [paymentId])

  const handleOwnersIds = (
    ownersIds: PaymentSelectedIds[],
  ) => {
    ownerPaymentViewController
      .attachOwnerPayment(ownersIds, payment!)
      .then((successfully) => {
        if (successfully) {
          closeModal()
        }
      })
  }

  const handleAddUsers = (ownerIds: string[]) => {
    setData(ownerIds)
    openModal()
  }

  return (
    <>
      {isOpen && (
        <PaymentAddUserForm
          activeOwnerIds={data!}
          handleClose={closeModal}
          handleOwnerIds={handleOwnersIds}
        />
      )}
      <PaymentUserList
        handleAddUsers={handleAddUsers}
        allOwners={allOwners}
        owners={owners}
        setOwners={setOwners}
        payment={payment}
      />
    </>
  )
}
