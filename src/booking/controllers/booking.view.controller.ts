import { SUPPORT_MESSAGES } from '../../shared/constants/support-messages.constants'
import { useAppDispatch } from '../../shared/store/hooks'
import { setLoading } from '../../shared/store/slices/loading/loadingSlice'
import { showToast } from '../../shared/store/slices/toast/toastSlice'
import {
  BookingDTO,
  BookingVm,
} from '../interfaces/booking.interface'
import { useBookingModelController } from './booking.model.controller'

export const useBookingViewController = () => {
  const bookingModelController = useBookingModelController()
  const dispatch = useAppDispatch()

  const getBookingsByOwner = async (): Promise<
    BookingVm[]
  > => {
    dispatch(setLoading(true))
    try {
      return await bookingModelController.getBookingsByOwner()
    } catch {
      dispatch(
        showToast({
          title: 'No se pudieron obtener las reservas',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const getAllBookings = async () => {
    dispatch(setLoading(true))
    try {
      return await bookingModelController.getBookings()
    } catch {
      dispatch(
        showToast({
          title: 'No se pudieron obtener las reservas',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return []
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deleteBooking = async (booking: BookingDTO) => {
    dispatch(setLoading(true))
    try {
      await bookingModelController.deleteBooking(booking)
      return true
    } catch {
      dispatch(
        showToast({
          title: 'No se pudo eliminar la reservación',
          details: [SUPPORT_MESSAGES.TRY_LATER],
          type: 'error',
        }),
      )
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    deleteBooking,
    getBookingsByOwner,
    getAllBookings,
  }
}
