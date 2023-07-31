import { useEffect, useState } from 'react'
import { DefaultContainerWithSearch } from '../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { ModalContainer } from '../shared/components/Modal/Modal'
import { useModal } from '../shared/hooks/useModal'
import { ApartmentForm } from './components/ApartmentForm'
import { ApartmentList } from './components/ApartmentList'
import { useApartmentViewController } from './controllers/apartment.view.controller'
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

  const apartmentViewController =
    useApartmentViewController()

  useEffect(() => {
    apartmentViewController
      .getApartments()
      .then((apartments) => {
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

  const handleDelete = (
    tableApartment: ApartmentWithOwner,
  ) => {
    apartmentViewController
      .deleteApartment(tableApartment)
      .then((deleted) => {
        if (deleted) {
          const apartmentsWithoutDeleted =
            apartments.filter(
              (apartment) =>
                apartment.id !== tableApartment.id,
            )
          setApartments(apartmentsWithoutDeleted)
        }
      })
  }

  return (
    <>
      {isOpen && (
        <ModalContainer
          className="w-[45em]"
          close={closeModal}
          title={`${
            data ? 'Editar' : 'Crear'
          } unidad residencial`}
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
        title="Unidad residencial"
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
