import { useEffect, useState } from 'react'
import { TbCashOff, TbCash } from 'react-icons/tb'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { useAppSelector } from '../../shared/store/hooks'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { usePaymentOwnerViewController } from '../controllers/payment-owner.view.controller'
import {
  PAYMENT_TYPE_LABELS,
  PaymentState,
  PaymentWithState,
} from '../interfaces/payment.interface'
import { formattedCurrency } from '../../shared/utils/formattedCurrency'

export const PaymentOwnerPage = () => {
  const [noData, setNoData] = useState(false)
  const [payments, setPayments] = useState<
    PaymentWithState[]
  >([])
  const [allPayments, setAllPayments] = useState<
    PaymentWithState[]
  >([])
  const paymentOwnerViewController =
    usePaymentOwnerViewController()
  const { uid } = useAppSelector((store) => store.authState)

  useEffect(() => {
    paymentOwnerViewController
      .getPaymentOwnerByOwnerId(uid)
      .then((res) => {
        if (res) {
          setPayments(res.payments)
          setAllPayments(res.payments)
          return
        }
        setNoData(true)
      })
  }, [])

  return (
    <DefaultContainerWithSearch
      title="Servicios"
      searchOptions={{
        allItems: allPayments,
        searchKeys: ['description', 'price', 'state'],
        setItems: setPayments,
      }}
    >
      <Table>
        <THead>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Estado</th>
        </THead>
        <tbody>
          {payments &&
            payments.length !== 0 &&

            payments.map((payment, index) => (
              <TRow key={payment.id} index={index}>
                <td>{payment.description}</td>
                <td>{formattedCurrency(+payment.price)}</td>
                <td
                  className={
                    payment.state ===
                    PAYMENT_TYPE_LABELS[PaymentState.PAID]
                      ? 'text-green-600 font-bold'
                      : 'text-yellow-500 font-bold'
                  }
                >
                  <div className="flex items-center gap-1">
                    {payment.state ===
                    PAYMENT_TYPE_LABELS[
                      PaymentState.PAID
                    ] ? (
                      <TbCash size={20} />
                    ) : (
                      <TbCashOff size={20} />
                    )}
                    {payment.state}
                  </div>
                </td>
              </TRow>
            ))}
          {noData && (
            <TRow index={0}>
              <td className="font-bold" colSpan={3}>
                No se encontraron servicios
              </td>
            </TRow>
          )}
        </tbody>
      </Table>
    </DefaultContainerWithSearch>
  )
}
