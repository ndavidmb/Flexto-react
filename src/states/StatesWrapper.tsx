import { useState } from 'react'
import { DefaultContainerWithSearch } from '../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../shared/components/Modal/Modal'
import { useModal } from '../shared/hooks/useModal'
import { StateForm } from './components/StateForm'
import { StateList } from './components/StateList'
import { State } from './interfaces/state.interface'

export const StateWrapper = () => {
  const [consult, setConsult] = useState(0)
  const { openModal, closeModal, isOpen, data, setData } =
    useModal<State>()
  const open = (data?: State) => {
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
          title={`${data ? 'Editar' : 'Crear'} estado`}
        >
          <StateForm
            data={data}
            closeModal={handleClose}
          />
        </ModalContainer>
      )}
      <DefaultContainerWithSearch
        title="Estados"
        action={open}
      >
        <StateList openEdit={open} consult={consult} />
      </DefaultContainerWithSearch>
    </>
  )
}

