import { useEffect, useState } from 'react'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { AdminRequestList } from '../components/AdminRequestList'
import { useRequestController } from '../controllers/request.controller'
import { Button } from '../../shared/styled-components/Button'
import { BiRefresh } from 'react-icons/bi'

export const AdminRequestPage = () => {
  const [adminRequests, setAdminRequests] = useState<
    AdminRequest[]
  >([])

  const requestController = useRequestController()

  useEffect(() => {
    requestController.getAdminRequest().then((adminReq) => {
      setAdminRequests(adminReq)
    })
  }, [])

  const handleRefresh = () => {
    requestController.getAdminRequest().then((adminReq) => {
      setAdminRequests(adminReq)
    })
  }

  const handleDenyRequest = (request: AdminRequest) => {
    requestController
      .changeRequestState(RequestStates.REJECTED, request)
      .then(() =>
        refreshState(request.id!, RequestStates.REJECTED),
      )
  }

  const handleAcceptRequest = (request: AdminRequest) => {
    requestController
      .changeRequestState(RequestStates.ACCEPTED, request)
      .then(() =>
        refreshState(request.id!, RequestStates.ACCEPTED),
      )
  }

  const handleDelete = (request: AdminRequest) => {
    requestController
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

  return (
    <>
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
