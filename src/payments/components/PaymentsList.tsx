import { FC } from 'react'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { Button } from '../../shared/styled-components/Button'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { PaymentWithId } from '../interfaces/payment.interface'

type Props = {
  payments: PaymentWithId[]
  allPayments: PaymentWithId[]

  setPayments: React.Dispatch<
    React.SetStateAction<PaymentWithId[]>
  >
  handleDelete: (id: string) => void
  handleEdit: (payment: PaymentWithId) => void
  handleCreate: () => void
  handleAddOwner: (payment: PaymentWithId) => void
}

export const PaymentsList: FC<Props> = ({
  payments,
  allPayments,
  setPayments,
  handleDelete,
  handleEdit,
  handleCreate,
  handleAddOwner,
}) => {
  return (
    <DefaultContainerWithSearch
      searchOptions={{
        allItems: allPayments,
        searchKeys: ['description'],
        setItems: setPayments,
      }}
      title="Servicios"
      action={handleCreate}
    >
      <Table>
        <THead>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Usuarios</th>
          <th>Acciones</th>
        </THead>
        <tbody>
          {payments.map((payment, index) => (
            <TRow index={index} key={payment.id}>
              <td>{payment.description}</td>
              <td>{payment.price}</td>
              <td>
                <div className="flex items-center">
                  <Button
                    color="secondary"
                    className='min-w-max'
                    onClick={() => handleAddOwner(payment)}
                  >
                    Agregar un usuario
                  </Button>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <Button
                    color="link"
                    onClick={() => handleEdit(payment)}
                  >
                    Editar
                  </Button>
                  <Button
                    color="link"
                    onClick={() => handleDelete(payment.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </td>
            </TRow>
          ))}
        </tbody>
      </Table>
    </DefaultContainerWithSearch>
  )
}
