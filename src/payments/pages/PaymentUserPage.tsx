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
  PaymentState,
  PaymentWithId,
} from '../interfaces/payment.interface'
import { PaymentMessageForm } from '../components/PaymentMessageForm'

export const PaymentUserPage = () => {
  const [owners, setOwners] = useState<OwnerPaymentVm[]>([])
  const { closeModal, isOpen, data, openModal, setData } =
    useModal<string[]>()

  const {
    closeModal: closeMessageModal,
    isOpen: isOpenMessageModal,
    data: messageData,
    openModal: openMessageModal,
    setData: setMessageModalData,
  } = useModal<OwnerPaymentVm>()

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
      getOwners(paymentId)

      paymentViewController
        .getPaymentById(paymentId)
        .then((payment) => {
          setPayment(payment)
        })
    }
  }, [paymentId])

  const getOwners = (paymentId: string) => {
    paymentOwnerViewController
      .getAllOwnersByPaymentId(paymentId)
      .then((res) => {
        setOwners(res)
        setAllOwners(res)
      })
  }

  const handleOwnersIds = (
    ownersIds: PaymentSelectedIds[],
  ) => {
    ownerPaymentViewController
      .attachOwnerPayment(ownersIds, payment!)
      .then((successfully) => {
        if (successfully) {
          closeModal()
          getOwners(paymentId!)
        }
      })
  }

  const handleAddUsers = (ownerIds: string[]) => {
    setData(ownerIds)
    openModal()
  }

  const handleChangeOwnerState = (
    owner: OwnerPaymentVm,
    payment: PaymentWithId,
    newState: PaymentState,
  ) => {
    ownerPaymentViewController
      .updateOwnerState(owner, payment, newState)
      .then((successfully) => {
        if (successfully) {
          getOwners(paymentId!)
        }
      })
  }

  const handleResetUserStates = (paymentId: string) => {
    ownerPaymentViewController
      .resetUserStates(paymentId)
      .then((successfully) => {
        if (successfully) {
          getOwners(paymentId!)
        }
      })
  }

  const handleSentMessage = (owner: OwnerPaymentVm) => {
    setMessageModalData(owner)
    openMessageModal()
  }

  const handleSubmit = (values: {
    email: string
    message: string
  }) => {}

  return (
    <>
      {isOpen && (
        <PaymentAddUserForm
          activeOwnerIds={data!}
          handleClose={closeModal}
          handleOwnerIds={handleOwnersIds}
        />
      )}

      {isOpenMessageModal && (
        <PaymentMessageForm
          handleSubmit={handleSubmit}
          closeModal={closeMessageModal}
          owner={messageData!}
        />
      )}

      <PaymentUserList
        handleSentMessage={handleSentMessage}
        handleResetUserStates={handleResetUserStates}
        handleAddUsers={handleAddUsers}
        handleChangeState={handleChangeOwnerState}
        allOwners={allOwners}
        owners={owners}
        setOwners={setOwners}
        payment={payment}
      />
    </>
  )
}
