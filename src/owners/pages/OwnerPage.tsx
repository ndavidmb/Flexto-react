import { useEffect, useState } from 'react'
import { useOutlet } from 'react-router-dom'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { useModal } from '../../shared/hooks/useModal'
import { OwnerForm } from '../components/OwnerForm'
import { OwnerList } from '../components/OwnerList'
import { useOwnerViewController } from '../controllers/owner.view.controller'
import { Owner } from '../interfaces/owner.interface'

export const OwnerPage = () => {
  // States
  const [consult, setConsult] = useState(0)
  const [allOwners, setAllOwners] = useState<Owner[]>([])
  const [owners, setOwners] = useState<Owner[]>([])

  // Hooks
  const ownerViewController = useOwnerViewController()
  const outlet = useOutlet()
  const { openModal, closeModal, isOpen, data, setData } =
    useModal<Owner>()

  // Life cycle
  useEffect(() => {
    ownerViewController.getOwners().then((owners) => {
      setOwners(owners)
      setAllOwners(owners)
    })
  }, [consult])

  // Functions
  const open = (data?: Owner) => {
    setData(data)
    openModal()
  }

  const handleClose = (refresh?: boolean) => {
    if (refresh) {
      setConsult(consult + 1)
    }
    closeModal()
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
        <DefaultContainerWithSearch<Owner>
          searchOptions={{
            allItems: allOwners,
            searchKeys: ['name', 'phone', 'email'],
            setItems: setOwners,
          }}
          title="Propietarios"
        >
          <OwnerList
            openEdit={open}
            owners={owners}
            setOwners={setOwners}
          />
        </DefaultContainerWithSearch>
      )}
    </>
  )
}
