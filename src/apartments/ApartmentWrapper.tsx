import { useState } from 'react'
import { DefaultContainerWithSearch } from '../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../shared/components/Modal/Modal'
import { useModal } from '../shared/hooks/useModal'
import { ApartmentForm } from './components/ApartmentForm'
import { ApartmentList } from './components/ApartmentList'
import { Apartment } from './interfaces/apartment.interface'

export const ApartmentWrapper = () => {
  const [consult, setConsult] = useState(0)
  const { openModal, closeModal, isOpen, data, setData } =
    useModal<Apartment>()

  const open = (data?: Apartment) => {
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
          title={`${data ? 'Editar' : 'Crear'} apartamento`}
        >
          <ApartmentForm
            data={data}
            closeModal={handleClose}
          />
        </ModalContainer>
      )}
      <DefaultContainerWithSearch
        title="Apartamentos"
        action={open}
      >
        <ApartmentList openEdit={open} consult={consult} />
      </DefaultContainerWithSearch>
    </>
  )
}
