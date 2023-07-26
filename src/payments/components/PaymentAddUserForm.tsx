import { FC, useEffect, useState } from 'react'
import { useOwnerViewController } from '../../owners/controllers/owner.view.controller'
import { Owner } from '../../owners/interfaces/owner.interface'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { Checkbox } from '../../shared/styled-components/Checkbox'
import { Button } from '../../shared/styled-components/Button'
import { PaymentSelectedIds } from '../interfaces/payment-form'

type Props = {
  handleClose: () => void
  handleOwnerIds: (data: PaymentSelectedIds[]) => void
}
export const PaymentAddUserForm: FC<Props> = ({
  handleClose,
  handleOwnerIds,
}) => {
  const [owners, setOwners] = useState<Owner[]>([])
  const [selectedOwners, setSelectedOwners] = useState<
    PaymentSelectedIds[]
  >([])

  const ownerViewController = useOwnerViewController()

  useEffect(() => {
    ownerViewController.getOwners().then((owners) => {
      setOwners(owners)
    })
  }, [])

  const handleChange = (checked: boolean, owner: Owner) => {
    setSelectedOwners((current) => [
      ...current,
      { ownerId: owner.id!, selected: checked },
    ])
  }

  const handleSave = () => {
    handleOwnerIds(selectedOwners)
  }

  return (
    <ModalContainer
      close={handleClose}
      title="Agregar usuarios"
    >
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {owners.map((owner) => (
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {owner.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {owner.email}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <Checkbox
                  name={owner.id!}
                  onChange={(e) =>
                    handleChange(e.target.checked, owner)
                  }
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Button color="primary" onClick={() => handleSave()}>
        Guardar
      </Button>
    </ModalContainer>
  )
}
