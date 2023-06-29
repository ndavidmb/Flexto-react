import { useAuthFacade } from '../../auth/facades/auth.facade'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import {
  REQUEST_TYPE_DICT,
  RequestType,
} from '../interfaces/client-request.interface'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { useRequestService } from '../services/request.service'

export const useRequestController = () => {
  const requestService = useRequestService()
  const authFacade = useAuthFacade()
  const dispatch = useAppDispatch()

  const getAdminRequest = async (): Promise<
    AdminRequest[]
  > => {
    dispatch(setLoading(true))
    try {
      const adminRequests =
        await requestService.getAdminRequest()
      return adminRequests
    } catch (err) {
      console.error(err)
      dispatch(
        showToast({
          title:
            'Error al consultar las solicitudes del administrador',
          type: 'error',
          details: [
            'Error en la base de datos contacte con su administrador o intente más tarde',
          ],
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const changeRequestState = async (
    newState: RequestStates,
    request: AdminRequest,
  ) => {
    dispatch(setLoading(true))
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
      console.error(err)

      // Restart request state
      await requestService.changeRequestState(
        RequestStates.PENDING,
        request,
      )

      dispatch(
        showToast({
          details: [
            `No se pudo actualizar el estado de ${
              REQUEST_TYPE_DICT[request.type]
            } de ${request.user.displayName}`,
          ],
          title: 'Error al actualizar el estado',
          type: 'error',
        }),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deleteRequest = async (request: AdminRequest) => {
    dispatch(setLoading(true))
    try {
      requestService.deleteRequest(request.id!)
      return true
    } catch (err) {
      console.error(err)
      dispatch(
        showToast({
          title: 'Error al borrar la solicitud',
          details: [
            `Error al eliminar la solicitud del usuario ${request.user.displayName}`,
          ],
          type: 'error',
        }),
      )

      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    getAdminRequest,
    changeRequestState,
    deleteRequest,
  }
}
