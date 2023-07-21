import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { useRequestModelController } from './request.model.controller'
import { REQUEST_TYPE_DICT } from '../interfaces/client-request.interface'
import {
  AdminRequest,
  RequestStates,
} from '../interfaces/request.interface'
import { Apartment } from '../../apartments/interfaces/apartment.interface'

export const useRequestViewController = () => {
  const requestModelController = useRequestModelController()
  const dispatch = useAppDispatch()

  const getAdminRequest = async (): Promise<
    AdminRequest[]
  > => {
    dispatch(setLoading(true))
    try {
      return await requestModelController.getAdminRequest()
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
      await requestModelController.changeRequestState(
        newState,
        request,
      )
    } catch (err) {
      console.error(err)
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
      requestModelController.deleteRequest(request.id!)
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

  const acceptAccessRequest = async (
    apartment: Apartment,
    request: AdminRequest,
  ) => {
    dispatch(setLoading(true))
    try {
      await requestModelController.acceptAccessRequest(
        request,
        apartment,
      )
      return true
    } catch (err) {
      dispatch(
        showToast({
          title: `No se pudo vincular la unidad residencial al usuario ${request.user.displayName}`,
          details: [
            'Por favor intente mas tarde o contacte con soporte',
          ],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  const acceptPublicSpaceRequest = async (
    request: AdminRequest,
  ) => {
    dispatch(setLoading(true))
    try {
      await requestModelController.acceptPublicSpaceRequest(
        request,
      )
      return true
    } catch {
      dispatch(
        showToast({
          title:
            'No se pudo aceptar correctamente la solicitud',
          details: [
            'Intente más tarde o contacte con soporte',
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
    acceptPublicSpaceRequest,
    acceptAccessRequest,
  }
}
