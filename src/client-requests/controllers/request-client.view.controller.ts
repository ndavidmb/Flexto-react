import { BookingDTO } from '../../booking/interfaces/booking.interface'
import { usePublicSpacesModelController } from '../../public-spaces/controllers/public-spaces.model.controller'
import { PublicSpaceWithHours } from '../../public-spaces/interfaces/public-space.interface'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
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
  }
}
