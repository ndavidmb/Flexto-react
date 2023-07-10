import { useEffect, useState } from 'react'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { useModal } from '../../shared/hooks/useModal'
import { PublicSpacesForm } from '../components/PublicSpacesForm'
import { PublicSpacesList } from '../components/PublicSpacesList'
import { usePublicSpacesViewController } from '../controllers/public-spaces.view.controller'
import { PublicSpace } from '../interfaces/public-space.interface'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'

export const PublicSpacesPage = () => {
  const [publicSpaces, setPublicSpaces] = useState<
    PublicSpace[]
  >([])

  const [allPublicSpaces, setAllPublicSpaces] = useState<
    PublicSpace[]
  >([])

  const { isOpen, data, openModal, closeModal, setData } =
    useModal<PublicSpace>()

  const publicSpacesViewController =
    usePublicSpacesViewController()

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    publicSpacesViewController
      .getAllPublicSpaces()
      .then((spaces) => {
        setAllPublicSpaces(spaces)
        setPublicSpaces(spaces)
      })
  }

  const handleDelete = (space: PublicSpace) => {
    publicSpacesViewController
      .deletePublicSpace(space)
      .then((successfully) => {
        if (successfully) {
          getData()
        }
      })
  }

  const handleEdit = (space: PublicSpace) => {
    setData(space)
    openModal()
  }

  const handleCreate = () => {
    openModal()
  }

  const handleClose = (refresh?: boolean) => {
    if (refresh) {
      getData()
    }

    closeModal()
  }

  return (
    <>
      {isOpen && (
        <ModalContainer
          close={closeModal}
          title={data ? 'Editar' : 'Crear espacio público'}
          width="w-[500px]"
        >
          <PublicSpacesForm
            data={data}
            closeModal={handleClose}
          />
        </ModalContainer>
      )}

      <DefaultContainerWithSearch
        title="Espacios públicos"
        action={handleCreate}
        searchOptions={{
          allItems: allPublicSpaces,
          searchKeys: ['name'],
          setItems: setPublicSpaces,
        }}
      >
        <PublicSpacesList
          publicSpaces={publicSpaces}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </DefaultContainerWithSearch>
    </>
  )
}
