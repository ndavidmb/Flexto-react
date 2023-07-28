import { FC, useEffect, useState } from 'react'
import { useOwnerViewController } from '../../owners/controllers/owner.view.controller'
import { Owner } from '../../owners/interfaces/owner.interface'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { Checkbox } from '../../shared/styled-components/Checkbox'
import { Button } from '../../shared/styled-components/Button'
import { PaymentSelectedIds } from '../interfaces/payment-form'
import { SelectableOwner } from '../../owners/interfaces/selectable-owner.interface'

type Props = {
  activeOwnerIds: string[]
  handleClose: () => void
  handleOwnerIds: (data: PaymentSelectedIds[]) => void
}
export const PaymentAddUserForm: FC<Props> = ({
  activeOwnerIds,
  handleClose,
  handleOwnerIds,
}) => {
  const [owners, setOwners] = useState<SelectableOwner[]>(
    [],
  )

  const ownerViewController = useOwnerViewController()

  useEffect(() => {
    ownerViewController.getOwners().then((owners) => {
      const selectedOwners = owners.map((owner) => {
        const selected = activeOwnerIds.some(
          (ownerId) => ownerId === owner.id,
        )

        if (selected) {
          handleChange(selected, owner)
        }

        return {
          ...owner,
          // Active the current owners
          selected,
        }
      })

      setOwners(selectedOwners)
    })
  }, [])

  const handleChange = (checked: boolean, owner: Owner) => {
    setOwners((curr) =>
      curr.map((stateOwner) =>
        stateOwner.id === owner.id
          ? { ...owner, selected: checked }
          : { ...stateOwner },
      ),
    )
  }

  const handleSave = () => {
    const selectedOwners: PaymentSelectedIds[] = owners.map(
      (owner) => ({
        ownerId: owner.id!,
        selected: owner.selected,
      }),
    )

    handleOwnerIds(selectedOwners)
  }

  return (
    <ModalContainer
      close={handleClose}
      title="Agregar usuarios"
      className="w-1/2"
    >
      <div className="bg-white rounded-lg shadow w-full">
        <div className="p-3">
          <label
            htmlFor="input-group-search"
            className="sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search user"
            />
          </div>
        </div>
        <ul
          className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownSearchButton"
        >
          {owners.map((owner) => (
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <Checkbox
                  name={owner.id!}
                  checked={owner.selected}
                  onChange={(e) =>
                    handleChange(e.target.checked, owner)
                  }
                />
                <label
                  htmlFor={owner.id!}
                  className="flex justify-between w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                >
                  <div className="pl-2 flex flex-col">
                    {owner.name}
                    <small className="text-gray-600">
                      {owner.email}
                    </small>
                  </div>
                  <div className="flex flex-col">
                    {owner.apartment?.tower}-
                    {owner.apartment?.apartmentNumber}
                    <small className="text-gray-600">
                      Unidad Residencial
                    </small>
                  </div>
                </label>
              </div>
              <hr />
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
        >
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
          </svg>
          Delete user
        </a>
      </div>

      <div className="mt-2 flex justify-end">
        <Button
          color="primary"
          onClick={() => handleSave()}
        >
          Guardar
        </Button>
      </div>
    </ModalContainer>
  )
}
