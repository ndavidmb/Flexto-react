import { BookingDTO } from '../../booking/interfaces/booking.interface'
import { usePublicSpacesModelController } from '../../public-spaces/controllers/public-spaces.model.controller'
import { PublicSpaceWithHours } from '../../public-spaces/interfaces/public-space.interface'
import { ValidateError } from '../../shared/errors/validate-error'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import { ClientRequestRecord } from '../interfaces/client-request.interface'
import {
  RequestPublicSpaceDTO,
  RequestPublicSpaceForm,
} from '../interfaces/request-public-space.interface'
import { useRequestModelController } from './request.model.controller'

export const useRequestClientViewController = () => {
  const requestModelController = useRequestModelController()
  const publicSpacesModelController =
    usePublicSpacesModelController()

  const dispatch = useAppDispatch()

  const getOwnerRequest = async (uid: string) => {
    return await requestModelController.getOwnerRequest(uid)
  }

  const getPublicSpaces = async (): Promise<{
    publicWithHours: PublicSpaceWithHours[]
    bookings: BookingDTO[]
  }> => {
    dispatch(setLoading(true))
    try {
      return await publicSpacesModelController.getPublicSpacesHours()
    } catch (error) {
      dispatch(
        showToast({
          title:
            'No se pudieron obtener las zonas comunes disponibles',
          details: [
            'Intente más tarde o contacte con soporte',
          ],
          type: 'error',
        }),
      )
      return {
        publicWithHours: [],
        bookings: [],
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const createPublicSpaceRequest = async (
    request: RequestPublicSpaceDTO,
  ) => {
    dispatch(setLoading(true))
    try {
      await requestModelController.createPublicSpaceRequest(
        request,
      )
      return true
    } catch (error) {
      console.error(error);
      if (error instanceof ValidateError) {
        dispatch(
          showToast({
            title: 'No se pudo crear la solicitud',
            details: [
              'El día seleccionado no cumple con el horario adecuado',
              error.message,
            ],
            type: 'info',
          }),
        )
        return false
      }

      dispatch(
        showToast({
          title: 'No se pudo crear la solicitud',
          details: [
            'intente más tarde o contacte con soporte',
          ],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }
  const createActRequest = async (
    request: ClientRequestRecord,
  ) => {
    dispatch(setLoading(true))
    try {
      await requestModelController.createActRequest(
        request,
      )
      return true
    } catch (error) {
      dispatch(
        showToast({
          title: 'No se pudo crear la solicitud',
          details: [
            'intente más tarde o contacte con soporte',
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
    getOwnerRequest,
    getPublicSpaces,
    createPublicSpaceRequest,
    createActRequest
  }
}
