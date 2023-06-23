import { AiFillFileAdd } from 'react-icons/ai'
import { Button } from '../../shared/styled-components/Button'
import { ActTemplatesList } from '../components/ActTemplatesList'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { useModal } from '../../shared/hooks/useModal'
import { ActTemplatesForm } from '../components/ActTemplatesForm'
import { ActTemplate } from '../interfaces/act-templates.interface'
import { FC, useEffect, useState } from 'react'
import { useActController } from '../controllers/act.controller'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { ActFormData } from '../interfaces/act-form-data.interface'

type Props = {
  actType: FirestoreTable.ACT_TEMPLATES | FirestoreTable.ACT
  labelsName: string
}

export const ActDynamicPage: FC<Props> = ({ actType, labelsName }) => {
  // Hooks
  const [templates, setTemplates] = useState<ActTemplate[]>(
    [],
  )
  const { openModal, closeModal, isOpen, data, setData } =
    useModal<ActTemplate>()

  useEffect(() => {
    getTemplates()
  }, [actType])

  // Services
  const actController = useActController(actType)

  const getTemplates = () => {
    actController.getMappedTemplates().then((templates) => {
      setTemplates(templates)
    })
  }

  // Methods

  const handleClose = (newTemplate?: ActFormData) => {
    if (newTemplate) {
      handleAddUser(newTemplate)
    }

    closeModal()
  }

  const handleOpenModal = (data?: ActTemplate) => {
    setData(data)
    openModal()
  }

  const handleDelete = async (id: string) => {
    await actController.deleteTemplate(id)
    getTemplates()
  }

  const handleAddUser = async (
    newTemplate: ActFormData,
  ) => {
    // If it is not edit
    if (data) {
      await actController.updateTemplate({
        id: data.id,
        formData: newTemplate,
        oldTemplate: data,
      })
    } else {
      await actController.addTemplate(newTemplate)
    }

    getTemplates()
  }

  return (
    <>
      {isOpen && (
        <ModalContainer
          close={closeModal}
          title={`${data ? 'Editar' : 'Crear'} plantilla`}
          width="300px"
        >
          <ActTemplatesForm
            closeModal={handleClose}
            labelsName={labelsName}
            data={data}
          />
        </ModalContainer>
      )}
      <ActTemplatesList
        templates={templates}
        labelsName={labelsName}
        editTemplate={(data) => handleOpenModal(data)}
        deleteTemplate={(id) => handleDelete(id)}
      />
      <div className="absolute bottom-10 right-10 shadow">
        <Button
          className="flex items-center justify-center p-2 gap-2"
          color="primary"
          onClick={() => handleOpenModal()}
        >
          <AiFillFileAdd />
          Agregar {labelsName}
        </Button>
      </div>
    </>
  )
}
