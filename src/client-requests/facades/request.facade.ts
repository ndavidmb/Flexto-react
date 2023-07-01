import { useAuthFacade } from '../../auth/facades/auth.facade'
import { RequestType } from '../interfaces/client-request.interface'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { useRequestService } from '../services/request.service'

export const useRequestFacade = () => {
  const requestService = useRequestService()
  const authFacade = useAuthFacade()

  const getAdminRequest = async () => {
    return await requestService.getAdminRequest()
  }

  const deleteRequest = async (id: string) => {
    await requestService.deleteRequest(id)
  }

  const changeRequestState = async (
    newState: RequestStates,
    request: AdminRequest,
  ) => {
    try {
      await requestService.changeRequestState(
        newState,
        request,
      )

      if (
        request.type === RequestType.ACCESS &&
        newState === RequestStates.ACCEPTED
      ) {
        await authFacade.activateUserAccount(
          request.user.uid,
        )
      }
    } catch (err) {
      await requestService.changeRequestState(
        RequestStates.PENDING,
        request,
      )
      throw err
    }
  }

  return {
    getAdminRequest,
    changeRequestState,
    deleteRequest,
  }
}
