import { useEffect, useState } from 'react'
import { AiFillFileAdd } from 'react-icons/ai'
import { PaymentAddUserForm } from '../../payments/components/PaymentAddUserForm'
import { PaymentSelectedIds } from '../../payments/interfaces/payment-form'
import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useModal } from '../../shared/hooks/useModal'
import { Button } from '../../shared/styled-components/Button'
import { ActTemplatesList } from '../components/ActTemplatesList'
import { useActController } from '../controllers/act.controller'
import {
  ActTemplate,
  ActWithOwnersAccess,
} from '../interfaces/act-templates.interface'
import { useActViewController } from '../controllers/act.view.controller'
import { ActTemplatesForm } from '../components/ActTemplatesForm'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { ActFormData } from '../interfaces/act-form-data.interface'

export const ActPage = () => {
  const { isOpen, openModal, closeModal, setData, data } =
    useModal<ActWithOwnersAccess>()

  const {
    isOpen: isOpenCreateForm,
    openModal: openCreateForm,
    closeModal: closeCreateForm,
  } = useModal<ActWithOwnersAccess>()

  const [acts, setActs] = useState<ActWithOwnersAccess[]>(
    [],
  )

  const actController = useActController(FirestoreTable.ACT)
  const actViewController = useActViewController()

  useEffect(() => {
    getActs()
  }, [])

  const getActs = () => {
    actViewController.getActsWithOwner().then((acts) => {
      setActs(acts)
    })
  }

  const handleDelete = async (act: ActTemplate) => {
    await actController.deleteTemplate(act.id!)
    setActs((state) =>
      state.filter((stateAct) => stateAct.id !== act.id),
    )
  }

  const handleOpenModal = (act?: ActTemplate) => {
    if (act) {
      const completeAct = acts.find((a) => a.id === act.id)
      setData(completeAct)
      openModal()
      return
    }

    openCreateForm()
  }

  const handleOwnerIds = (ids: PaymentSelectedIds[]) => {
    actViewController
      .addBulkOwnerActsPermission(data!, ids)
      .then((successfully) => {
        if (successfully) {
          getActs()
          closeModal()
        }
      })
  }

  const handleSaveNewAct = (act?: ActFormData) => {
    if (!act) {
      closeCreateForm()
      return
    }

    actController.addTemplate(act).then((successfully) => {
      if (successfully) {
        getActs()
        closeCreateForm()
      }
    })
  }

  return (
    <>
      {isOpen && (
        <PaymentAddUserForm
          activeOwnerIds={data?.ownerAccess ?? []}
          handleClose={closeModal}
          handleOwnerIds={handleOwnerIds}
        />
      )}
      {isOpenCreateForm && (
        <ModalContainer
          close={closeCreateForm}
          title="Crear acta"
          width="300px"
        >
          <ActTemplatesForm
            closeModal={handleSaveNewAct}
            labelsName="acta"
          />
        </ModalContainer>
      )}
      <ActTemplatesList
        templates={acts}
        labelsName="del documento"
        actionLabel="Compartir"
        openActModal={(data) => handleOpenModal(data)}
        deleteTemplate={(act) => handleDelete(act)}
      />
      <div className="absolute bottom-10 right-10 shadow">
        <Button
          className="flex items-center justify-center p-2 gap-2"
          color="primary"
          onClick={() => handleOpenModal()}
        >
          <AiFillFileAdd />
          Agregar acta o documento
        </Button>
      </div>
    </>
  )
}
