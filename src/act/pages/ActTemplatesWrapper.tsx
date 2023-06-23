import { AiFillFileAdd } from 'react-icons/ai'
import { Button } from '../../shared/styled-components/Button'
import { ActTemplatesList } from '../components/ActTemplatesList'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { useModal } from '../../shared/hooks/useModal'
import { ActTemplatesForm } from '../components/ActTemplatesForm'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { useEffect, useState } from 'react'
import { useActController } from '../controllers/act.controller'

export const ActTemplatesWrapper = () => {
  // Hooks
  const [templates, setTemplates] = useState<ActTemplate[]>(
    [],
  )
  const { openModal, closeModal, isOpen, data, setData } =
    useModal<ActTemplate>()

  useEffect(() => {
    getTemplates()
  }, [])

  // Services
  const authController = useActController()

  const getTemplates = () => {
    authController
      .getMappedTemplates()
      .then((templates) => {
        setTemplates(templates)
      })
  }

  // Methods
  const handleClose = (refresh?: boolean) => {
    if (refresh) {
      getTemplates()
    }
    closeModal()
  }

  const handleOpenModal = (
    data?: ActTemplate,
  ) => {
    setData(data)
    openModal()
  }

  return (
    <>
      {isOpen && (
        <ModalContainer
          close={closeModal}
          title={`${data ? 'Editar' : 'Crear'} plantilla`}
        >
          <ActTemplatesForm closeModal={handleClose} data={data} id={data?.id} />
        </ModalContainer>
      )}
      <ActTemplatesList templates={templates} editTemplate={(data) => handleOpenModal(data)} />
      <div className="absolute bottom-10 right-10 shadow">
        <Button
          className="flex items-center justify-center p-2 gap-2"
          color="primary"
          onClick={handleOpenModal}
        >
          <AiFillFileAdd />
          Agregar plantilla
        </Button>
      </div>
    </>
  )
}
