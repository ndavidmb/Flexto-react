import { BookingDTO } from '../interfaces/booking.interface'
import { useBookingRepository } from '../repositories/booking.repository'

export const useBookingModelController = () => {
  const bookingRepository = useBookingRepository()

  const addBooking = async (booking: BookingDTO) => {
    await bookingRepository.addBooking(booking)
  }

  return { addBooking }
}
