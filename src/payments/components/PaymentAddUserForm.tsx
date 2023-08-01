import { FC, useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { VscCheckAll, VscCloseAll } from 'react-icons/vsc'
import { useOwnerViewController } from '../../owners/controllers/owner.view.controller'
import { Owner } from '../../owners/interfaces/owner.interface'
import { SelectableOwner } from '../../owners/interfaces/selectable-owner.interface'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { Button } from '../../shared/styled-components/Button'
import { Checkbox } from '../../shared/styled-components/Checkbox'
import { removeAccents } from '../../shared/styled-components/SearchInput'
import { PaymentSelectedIds } from '../interfaces/payment-form'

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

  const [allOwners, setAllOwners] = useState<
    SelectableOwner[]
  >([])

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

      console.log(
        selectedOwners.map((s) => ({
          email: s.email,
          selected: s.selected,
        })),
      )

      setAllOwners(selectedOwners)
      setOwners(selectedOwners)
    })
  }, [])

  const handleChange = (checked: boolean, owner: Owner) => {
    setAllOwners((curr) =>
      curr.map((stateOwner) =>
        stateOwner.id === owner.id
          ? { ...owner, selected: checked }
          : { ...stateOwner },
      ),
    )

    setOwners((curr) =>
      curr.map((stateOwner) =>
        stateOwner.id === owner.id
          ? { ...owner, selected: checked }
          : { ...stateOwner },
      ),
    )
  }

  const handleSave = () => {
    const selectedOwners: PaymentSelectedIds[] =
      allOwners.map((owner) => ({
        ownerId: owner.id!,
        selected: owner.selected,
      }))

    handleOwnerIds(selectedOwners)
  }

  const handleBulkSelect = (selected: boolean) => {
    const newOwners = owners.map((owner) => ({
      ...owner,
      selected,
    }))

    setOwners(newOwners)

    setAllOwners((curr) =>
      curr.map((owner) => {
        const currOwner = newOwners.find(
          (ow) => ow.id === owner.id,
        )

        return currOwner
          ? {
              ...owner,
              selected: currOwner.selected,
            }
          : {
              ...owner,
              selected: owner.selected,
            }
      }),
    )
  }

  const handleSearchChange = (searchText: string) => {
    const normalizedSearch = removeAccents(searchText)
      .toLowerCase()
      .trim()

    const filteredOwners = allOwners.filter(
      (owner) =>
        removeAccents(owner.name)
          .toLowerCase()
          .trim()
          .includes(normalizedSearch) ||
        removeAccents(owner.email)
          .toLowerCase()
          .trim()
          .includes(normalizedSearch) ||
        removeAccents(owner.apartment?.tower || '')
          .toLowerCase()
          .trim()
          .includes(normalizedSearch) ||
        removeAccents(
          owner.apartment?.apartmentNumber || '',
        )
          .toLowerCase()
          .trim()
          .includes(normalizedSearch),
    )

    setOwners(filteredOwners)
  }

  return (
    <ModalContainer
      close={handleClose}
      title="Agregar usuarios"
      className="w-[28em]"
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
              <IoSearch />
            </div>
            <input
              type="text"
              id="input-group-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  border-primary-search block w-full pl-10 p-2.5 "
              placeholder="Search user"
              onChange={(ev) =>
                handleSearchChange(ev.target.value)
              }
            />
          </div>
        </div>
        <ul
          className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700"
          aria-labelledby="dropdownSearchButton"
        >
          {owners.map((owner) => (
            <li key={owner.id}>
              <div className="flex items-center p-2 rounded hover:bg-gray-100">
                <Checkbox
                  name={owner.id!}
                  checked={owner.selected}
                  onChange={(e) =>
                    handleChange(e.target.checked, owner)
                  }
                />
                <label
                  htmlFor={owner.id!}
                  className="flex justify-between w-full ml-2 text-sm font-medium text-gray-900 rounded"
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
          className="flex gap-2 items-center justify-center p-3 text-sm font-medium border-t border-gray-200 rounded-b-lg bg-gray-50 "
        >
          <Button
            color="secondary"
            className="flex gap-1 justify-center items-center"
            onClick={() => handleBulkSelect(true)}
          >
            <VscCheckAll fontSize={14} />
            Seleccionar todos
          </Button>
          <Button
            color="secondary"
            className="flex gap-1 justify-center items-center"
            onClick={() => handleBulkSelect(false)}
          >
            <VscCloseAll fontSize={18} />
            Remover todos
          </Button>
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
