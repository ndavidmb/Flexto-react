import { useState } from 'react'
import { DefaultContainerWithSearch } from '../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../shared/components/Modal/Modal'
import { useModal } from '../shared/hooks/useModal'
import { OwnerForm } from './components/OwnerForm'
import { OwnerList } from './components/OwnerList'
import { Owner } from './interfaces/owner.interface'

export const OwnerWrapper = () => {
  const [consult, setConsult] = useState(0)
  const { openModal, closeModal, isOpen, data, setData } =
    useModal<Owner>()

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
          <OwnerForm
            data={data}
            closeModal={handleClose}
          />
        </ModalContainer>
      )}
      <DefaultContainerWithSearch
        title="Propietarios"
        action={open}
      >
        <OwnerList openEdit={open} consult={consult} />
      </DefaultContainerWithSearch>
    </>
  )
}