import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DefaultContainerWithSearch } from '../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../shared/components/Modal/Modal'
import { useModal } from '../shared/hooks/useModal'
import { setLoading } from '../shared/store/slices/loading/loadingSlice'
import { StateForm } from './components/StateForm'
import { StateList } from './components/StateList'
import { State } from './interfaces/state.interface'
import { useStateService } from './services/state.service'

export const StateWrapper = () => {
  // State
  const [allStates, setAllStates] = useState<State[]>([])
  const [states, setStates] = useState<State[]>([])
  const [consult, setConsult] = useState(0)

  // Hooks
  const stateService = useStateService()
  const dispatch = useDispatch()

  const { openModal, closeModal, isOpen, data, setData } =
    useModal<State>()

  // Life cycle
  useEffect(() => {
    dispatch(setLoading(true))
    stateService
      .getStates()
      .then((states) => {
        setStates(states)
        setAllStates(states)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }, [])

  // Functions
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
          <StateForm data={data} closeModal={handleClose} />
        </ModalContainer>
      )}
      <DefaultContainerWithSearch<State>
        searchOptions={{
          allItems: allStates,
          setItems: setStates,
          searchKeys: ['affair', 'detail'],
        }}
        title="Estados"
        action={open}
      >
        <StateList
          openEdit={open}
          states={states}
          setStates={setStates}
        />
      </DefaultContainerWithSearch>
    </>
  )
}
