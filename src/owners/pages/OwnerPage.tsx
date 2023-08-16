import { useEffect, useState } from 'react'
import { useOutlet } from 'react-router-dom'
import { Register } from '../../auth/components/Register'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { useModal } from '../../shared/hooks/useModal'
import { OwnerList } from '../components/OwnerList'
import { useOwnerViewController } from '../controllers/owner.view.controller'
import {
  Owner,
  OwnerWithApartment,
} from '../interfaces/owner.interface'
import { OwnerForm } from '../components/OwnerForm'

export const OwnerPage = () => {
  // States
  const [consult, setConsult] = useState(0)
  const [allOwners, setAllOwners] = useState<
    OwnerWithApartment[]
  >([])
  const [owners, setOwners] = useState<
    OwnerWithApartment[]
  >([])

  // Hooks
  const ownerViewController = useOwnerViewController()
  const outlet = useOutlet()
  const { openModal, closeModal, isOpen, data, setData } =
    useModal<OwnerWithApartment>()

  // Life cycle
  useEffect(() => {
    ownerViewController.getOwners().then((owners) => {
      setOwners(owners)
      setAllOwners(owners)
    })
  }, [consult])

  // Functions
  const open = (data?: OwnerWithApartment) => {
    setData(data)
    openModal()
  }

  const handleClose = (refresh?: boolean) => {
    if (refresh) {
      setConsult(consult + 1)
    }
    closeModal()
  }

  const handleDelete = (owner: OwnerWithApartment) => {
    ownerViewController
      .deleteUserTemporally(owner)
      .then((successfully) => {
        if (successfully) {
          setOwners((currOwners) =>
            currOwners.filter((o) => o.id !== owner.id),
          )
        }
      })
  }
  return (
    <>
      {isOpen && (
        <ModalContainer
          close={closeModal}
          title={`${data ? 'Editar' : 'Crear'} propietario`}
        >
          <OwnerForm data={data} closeModal={handleClose} />
        </ModalContainer>
      )}

      {outlet || (
        <DefaultContainerWithSearch<OwnerWithApartment>
          searchOptions={{
            allItems: allOwners,
            searchKeys: ['displayName', 'phoneNumber', 'email'],
            setItems: setOwners,
          }}
          title="Propietarios"
          action={open}
        >
          <OwnerList
            owners={owners}
            handleDelete={handleDelete}
          />
        </DefaultContainerWithSearch>
      )}
    </>
  )
}
