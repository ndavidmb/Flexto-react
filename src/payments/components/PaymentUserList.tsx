import { FC, useEffect, useMemo } from 'react'
import { Button } from '../../shared/styled-components/Button'
import { Checkbox } from '../../shared/styled-components/Checkbox'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import {
  OwnerPaymentVm,
  PaymentWithId,
} from '../interfaces/payment.interface'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'

type Props = {
  owners: OwnerPaymentVm[]
  allOwners: OwnerPaymentVm[]
  handleAddUsers: (ownerIds: string[]) => void
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
      title={payment?.description ?? 'Servicio'}
    >
      <Table>
        <THead>
          <th className="w-2">
            <Checkbox />
          </th>
          <th>Usuario</th>
          <th>Estado</th>
          <th>Acciones</th>
        </THead>
        <tbody>
          {owners.map((owner, index) => (
            <TRow index={index} key={owner.id}>
              <td className="w-2">
                <Checkbox />
              </td>
              <td>
                <div className="flex flex-col">
                  {owner.displayName}
                  <small>{owner.email}</small>
                </div>
              </td>
              <td>{owner.state}</td>
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
