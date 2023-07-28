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
import { BiReset } from 'react-icons/bi'

type Props = {
  owners: OwnerPaymentVm[]
  allOwners: OwnerPaymentVm[]
  payment: PaymentWithId | null
  handleResetUserStates: (paymentId: string) => void
  handleAddUsers: (ownerIds: string[]) => void
  handleChangeState: (
    owner: OwnerPaymentVm,
    payment: PaymentWithId,
    newState: PaymentState,
  ) => void
  setOwners: React.Dispatch<
    React.SetStateAction<OwnerPaymentVm[]>
  >
}
export const PaymentUserList: FC<Props> = ({
  owners,
  allOwners,
  payment,
  setOwners,
  handleAddUsers,
  handleChangeState,
  handleResetUserStates,
}) => {
  const ownerIds = useMemo(
    () => allOwners.map((owner) => owner.id as string),
    [allOwners],
  )

  return (
    <>
      <DefaultContainerWithSearch
        action={() => handleAddUsers(ownerIds)}
        actionName="Agregar usuarios"
        searchOptions={{
          allItems: allOwners,
          setItems: setOwners,
          searchKeys: [
            'email',
            'phoneNumber',
            'displayName',
          ],
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
      <div className="absolute bottom-10 right-10 shadow">
        <Button
          className="flex items-center justify-center p-2 gap-2"
          color="primary"
          onClick={() => handleResetUserStates(payment!.id)}
        >
          <BiReset />
          Pasar todos a pendiente
        </Button>
      </div>
    </>
  )
}
