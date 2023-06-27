import { useEffect, useState } from 'react'
import { DefaultContainerWithSearch } from '../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../shared/components/Modal/Modal'
import { useModal } from '../shared/hooks/useModal'
import { ApartmentForm } from './components/ApartmentForm'
import { ApartmentList } from './components/ApartmentList'
import { useApartmentController } from './controllers/apartment.controller'
import { Apartment } from './interfaces/apartment.interface'
import { ApartmentWithOwner } from './components/AparmentWithOwner'

export const ApartmentWrapper = () => {
  const [consult, setConsult] = useState(0)
  const [allApartments, setAllApartments] = useState<
    ApartmentWithOwner[]
  >([])

  const [apartments, setApartments] = useState<
    ApartmentWithOwner[]
  >([])
  const { openModal, closeModal, isOpen, data, setData } =
    useModal<Apartment>()

  const apartmentService = useApartmentController()

  useEffect(() => {
    apartmentService.getApartments().then((apartments) => {
      setApartments(apartments)
      setAllApartments(apartments)
    })
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

  const handleDelete = (id: string) => {
    apartmentService.deleteApartment(id).then((deleted) => {
      if (deleted) {
        const apartmentsWithoutDeleted = apartments.filter(
          (apartment) => apartment.id !== id,
        )
        setApartments(apartmentsWithoutDeleted)
      }
    })
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
      <DefaultContainerWithSearch<ApartmentWithOwner>
        searchOptions={{
          allItems: allApartments,
          searchKeys: [
            'tower',
            'apartmentNumber',
            'name',
            'phone',
            'email',
          ],
          setItems: setApartments,
        }}
        title="Apartamentos"
        action={open}
      >
        <ApartmentList
          openEdit={open}
          apartments={apartments}
          handleDelete={handleDelete}
        />
      </DefaultContainerWithSearch>
    </>
  )
}
