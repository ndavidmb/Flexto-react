import { useEffect, useState } from 'react'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { AdminRequestList } from '../components/AdminRequestList'
import { useRequestViewController } from '../controllers/request.view.controller'
import { Button } from '../../shared/styled-components/Button'
import { BiRefresh } from 'react-icons/bi'
import { useModal } from '../../shared/hooks/useModal'
import { ModalContainer } from '../../shared/components/Modal/Modal'
import { AdminRequestConnectOwnerForm } from '../components/AdminRequestConnectOwnerForm'
import { Apartment } from '../../apartments/interfaces/apartment.interface'

export const AdminRequestPage = () => {
  const { isOpen, openModal, closeModal, setData, data } =
    useModal<AdminRequest>()
  const [adminRequests, setAdminRequests] = useState<
    AdminRequest[]
  >([])

  const requestViewController = useRequestViewController()

  useEffect(() => {
    requestViewController
      .getAdminRequest()
      .then((adminReq) => {
        setAdminRequests(adminReq)
      })
  }, [])

  const handleRefresh = () => {
    requestViewController
      .getAdminRequest()
      .then((adminReq) => {
        setAdminRequests(adminReq)
      })
  }

  const handleDenyRequest = (request: AdminRequest) => {
    requestViewController
      .changeRequestState(RequestStates.REJECTED, request)
      .then(() =>
        refreshState(request.id!, RequestStates.REJECTED),
      )
  }

  const handleAcceptRequest = (request: AdminRequest) => {
    openModal()
    setData(request)
  }

  const handleDelete = (request: AdminRequest) => {
    requestViewController
      .deleteRequest(request)
      .then((successfully) => {
        if (successfully) {
          const newRequests = adminRequests.filter(
            (oldRequest) => oldRequest.id !== request.id,
          )
          setAdminRequests(newRequests)
        }
      })
  }

  const refreshState = (
    requestId: string,
    newState: RequestStates,
  ) => {
    const newRequests = adminRequests.map((oldRequest) =>
      oldRequest.id === requestId
        ? {
            ...oldRequest,
            approved: newState,
          }
        : oldRequest,
    )
    setAdminRequests(newRequests)
  }

  const handleCloseModal = (apartment?: Apartment) => {
    if (!apartment) {
      closeModal()
      return
    }

    requestViewController
      .updateOwnerApartment(apartment, data!)
      .then((successfully) => {
        if (successfully) {
          refreshState(data!.id!, RequestStates.ACCEPTED)
        }
      })
      .finally(() => closeModal())
  }

  return (
    <>
      {isOpen && (
        <ModalContainer
          close={closeModal}
          title="Vincular apartamento"
        >
          <AdminRequestConnectOwnerForm
            closeModal={handleCloseModal}
          />
        </ModalContainer>
      )}
      <AdminRequestList
        adminRequests={adminRequests}
        handleAcceptRequest={handleAcceptRequest}
        handleDenyRequest={handleDenyRequest}
        handleDelete={handleDelete}
      ></AdminRequestList>
      <div className="absolute bottom-10 right-10 shadow">
        <Button
          className="flex items-center justify-center p-2 gap-2"
          color="primary"
          onClick={() => handleRefresh()}
        >
          <BiRefresh />
          Refrescar
        </Button>
      </div>
    </>
  )
}
