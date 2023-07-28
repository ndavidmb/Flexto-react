import { useEffect, useState } from 'react'
import { useModal } from '../../shared/hooks/useModal'
import { PaymentForm } from '../components/PaymentForm'
import { PaymentsList } from '../components/PaymentsList'
import { usePaymentViewController } from '../controllers/payment.view.controller'
import {
  Payment,
  PaymentWithId,
} from '../interfaces/payment.interface'

export const PaymentsPage = () => {
  const { isOpen, openModal, closeModal, data, setData } =
    useModal<PaymentWithId>()

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

  return (
    <>
      {isOpen && (
        <PaymentForm
          data={data}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      )}
      <PaymentsList
        payments={payments}
        allPayments={allPayments}
        setPayments={setPayments}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
      />
    </>
  )
}
