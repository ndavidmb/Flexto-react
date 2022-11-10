import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DefaultContainerWithSearch } from '../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../shared/components/Modal/Modal'
import { useModal } from '../shared/hooks/useModal'
import { setLoading } from '../shared/store/slices/loading/loadingSlice'
import { ApartmentForm } from './components/ApartmentForm'
import { ApartmentList } from './components/ApartmentList'
import { Apartment } from './interfaces/apartment.interface'
import { useApartmentService } from './services/apartment.service'

export const ApartmentWrapper = () => {
  const [consult, setConsult] = useState(0)
  const [allApartments, setAllApartments] = useState<
    Apartment[]
  >([])

  const [apartments, setApartments] = useState<Apartment[]>(
    [],
  )
  const { openModal, closeModal, isOpen, data, setData } =
    useModal<Apartment>()

  const dispatch = useDispatch()
  const apartmentService = useApartmentService()

  useEffect(() => {
    dispatch(setLoading(true))
    apartmentService
      .getApartments()
      .then((apartments) => {
        setApartments(apartments)
        setAllApartments(apartments)
      })
      .finally(() => dispatch(setLoading(false)))
  }, [consult])

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
      <DefaultContainerWithSearch<Apartment>
        searchOptions={{
          items: allApartments,
          searchKeys: ['tower', 'apartmentNumber'],
          setItems: setApartments,
        }}
        title="Apartamentos"
        action={open}
      >
        <ApartmentList
          openEdit={open}
          apartments={apartments}
          setApartments={setApartments}
        />
      </DefaultContainerWithSearch>
    </>
  )
}
