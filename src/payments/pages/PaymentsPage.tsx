import { useEffect, useState } from 'react'
import { useModal } from '../../shared/hooks/useModal'
import { PaymentAddUserForm } from '../components/PaymentAddUserForm'
import { PaymentsList } from '../components/PaymentsList'
import { usePaymentViewController } from '../controllers/payment.view.controller'
import {
  Payment,
  PaymentWithId,
} from '../interfaces/payment.interface'
import { PaymentSelectedIds } from '../interfaces/payment-form'
import { PaymentForm } from '../components/PaymentForm'

export const PaymentsPage = () => {
  const { isOpen, openModal, closeModal, data, setData } =
    useModal<PaymentWithId>()

  const {
    isOpen: isOpenAddUser,
    openModal: openAddUserModal,
    closeModal: closeAddUserModal,
    data: userPaymentData,
    setData: setUserPaymentData,
  } = useModal<PaymentWithId>()

  const [payments, setPayments] = useState<PaymentWithId[]>(
    [],
  )
  const [allPayments, setAllPayments] = useState<
    PaymentWithId[]
  >([])

  const paymentViewController = usePaymentViewController()

  useEffect(() => {
    refreshView()
  }, [])

  const refreshView = () => {
    paymentViewController
      .getAllPayments()
      .then((payments) => {
        setPayments(payments)
        setAllPayments(payments)
      })
  }

  const handleDelete = (id: string) => {
    paymentViewController
      .deletePayment(id)
      .then((successfully) => {
        if (successfully) {
          refreshView()
        }
      })
  }

  const handleEdit = (payment: PaymentWithId) => {
    setData(payment)
    openModal()
  }

  const handleSubmit = (values: Payment) => {
    if (!data) {
      paymentViewController
        .createPayment(values)
        .then((successfully) => {
          if (successfully) {
            refreshView()
            handleClose()
          }
        })
      return
    }

    paymentViewController
      .updatePayment(data.id, values)
      .then((successfully) => {
        if (successfully) {
          refreshView()
          handleClose()
        }
      })
  }

  const handleClose = () => {
    setData(undefined)
    closeModal()
  }

  const handleCreate = () => {
    openModal()
  }

  const handleAddOwner = (payment: PaymentWithId) => {
    setUserPaymentData(payment)
    openAddUserModal()
  }

  const handleOwnersIds = (ownersIds: PaymentSelectedIds[]) => {
    paymentViewController
      .createPaymentState(ownersIds, userPaymentData!)
      .then((successfully) => {
        if (successfully) {
          handleCloseUserForm()
        }
      })
  }

  const handleCloseUserForm = () => {
    setUserPaymentData(undefined)
    closeAddUserModal()
  }

  return (
    <>
      {isOpen && (
        <PaymentForm
          data={data}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      )}
      {isOpenAddUser && (
        <PaymentAddUserForm
          handleClose={handleCloseUserForm}
          handleOwnerIds={handleOwnersIds}
        />
      )}
      <PaymentsList
        payments={payments}
        allPayments={allPayments}
        setPayments={setPayments}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
        handleAddOwner={handleAddOwner}
      />
    </>
  )
}
