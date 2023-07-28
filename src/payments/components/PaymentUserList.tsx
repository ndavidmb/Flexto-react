import { FC, useMemo } from 'react'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { Button } from '../../shared/styled-components/Button'
import { Select } from '../../shared/styled-components/Select'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { formattedNumber } from '../../shared/utils/formattedCurrency'
import {
  OwnerPaymentVm,
  PaymentState,
  PaymentWithId,
} from '../interfaces/payment.interface'

type Props = {
  owners: OwnerPaymentVm[]
  allOwners: OwnerPaymentVm[]
  handleAddUsers: (ownerIds: string[]) => void
  handleChangeState: (
    owner: OwnerPaymentVm,
    payment: PaymentWithId,
    newState: PaymentState,
  ) => void
  setOwners: React.Dispatch<
    React.SetStateAction<OwnerPaymentVm[]>
  >
  payment: PaymentWithId | null
}
export const PaymentUserList: FC<Props> = ({
  owners,
  allOwners,
  setOwners,
  payment,
  handleAddUsers,
  handleChangeState,
}) => {
  const ownerIds = useMemo(
    () => allOwners.map((owner) => owner.id as string),
    [allOwners],
  )

  return (
    <DefaultContainerWithSearch
      action={() => handleAddUsers(ownerIds)}
      actionName="Agregar usuarios"
      searchOptions={{
        allItems: allOwners,
        setItems: setOwners,
        searchKeys: ['email', 'phoneNumber', 'displayName'],
      }}
      title={`${payment?.description}` ?? 'Servicio'}
      subtitle={`Precio ${formattedNumber(
        payment?.price || 0,
      )}`}
    >
      <Table>
        <THead>
          <th>Usuario</th>
          <th>Estado</th>
          <th>Acciones</th>
        </THead>
        <tbody>
          {owners.map((owner, index) => (
            <TRow index={index} key={owner.id}>
              <td>
                <div className="flex flex-col">
                  {owner.displayName}
                  <small>{owner.email}</small>
                </div>
              </td>
              <td>
                <Select
                  allowUndefined={false}
                  className="w-56"
                  value={owner.state}
                  onChange={(ev) =>
                    handleChangeState(
                      owner,
                      payment!,
                      ev.target
                        .value as unknown as PaymentState,
                    )
                  }
                >
                  <option value={PaymentState.PAID}>
                    Pagó
                  </option>
                  <option value={PaymentState.PENDING}>
                    Pendiente
                  </option>
                </Select>
              </td>
              <td>
                <Button color="primary">
                  Enviar un mensaje
                </Button>
              </td>
            </TRow>
          ))}
        </tbody>
      </Table>
    </DefaultContainerWithSearch>
  )
}
