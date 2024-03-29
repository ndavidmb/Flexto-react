import { FC, useMemo } from 'react'
import { BiReset } from 'react-icons/bi'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { Button } from '../../shared/styled-components/Button'
import { Select } from '../../shared/styled-components/Select'
import { THead } from '../../shared/styled-components/THead'
import { TRow } from '../../shared/styled-components/TRow'
import { Table } from '../../shared/styled-components/Table'
import { formattedCurrency } from '../../shared/utils/formattedCurrency'
import {
  OwnerPaymentVm,
  OwnerPaymentWithStateName,
  PaymentState,
  PaymentWithId,
} from '../interfaces/payment.interface'

type Props = {
  owners: OwnerPaymentWithStateName[]
  allOwners: OwnerPaymentWithStateName[]
  payment: PaymentWithId | null
  handleSentMessage: (owner: OwnerPaymentVm) => void
  handleResetUserStates: (paymentId: string) => void
  handleAddUsers: (ownerIds: string[]) => void
  handleChangeState: (
    owner: OwnerPaymentVm,
    payment: PaymentWithId,
    newState: PaymentState,
  ) => void
  setOwners: React.Dispatch<
    React.SetStateAction<OwnerPaymentWithStateName[]>
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
  handleSentMessage,
}) => {
  const navigate = useNavigate()
  const ownerIds = useMemo(
    () => allOwners.map((owner) => owner.ownerId as string),
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
            'paymentId',
            'stateName',
          ],
        }}
        title={`${payment?.description}` ?? 'Servicio'}
        subtitle={`Precio ${formattedCurrency(
          payment?.price || 0,
        )}`}
      >
        <div className="px-4 pb-2">
          <Button
            color="secondary"
            className="flex gap-2 items-center justify-center"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack />
            Volver
          </Button>
        </div>

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
                  <Button
                    onClick={() => handleSentMessage(owner)}
                    color="primary"
                  >
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
