import { useEmail } from '../../auth/hooks/useEmail'
import { HOURS_NUM_TO_STRING } from '../../public-spaces/constants/hours'
import { useAppSelector } from '../../shared/store/hooks'
import {
  BookingDTO,
  BookingVm,
} from '../interfaces/booking.interface'
import { useBookingRepository } from '../repositories/booking.repository'

export const useBookingModelController = () => {
  const bookingRepository = useBookingRepository()
  const { uid } = useAppSelector((state) => state.authState)
  const email = useEmail()

  const addBooking = async (booking: BookingDTO) => {
    await bookingRepository.addBooking(booking)
  }

  const deleteBooking = async (booking: BookingDTO) => {
    await bookingRepository.deleteBooking(booking.id!)
    await email.sendEmail({
      // email: booking.owner.email,
      email: 'nmontanob@slabcode.com',
      body: `Se cancelo la reservación para "${
        booking.publicSpace
      }" el día ${booking.date} a las ${
        // @ts-ignore
        HOURS_NUM_TO_STRING[booking.startHour]
      }`,
      subject:
        'Se cancelo su reservación para el espacio público',
    })
  }

  const getBookingsByOwner = async (): Promise<
    BookingVm[]
  > => {
    const bookings =
      await bookingRepository.getBookingsByOwner(uid)

    return bookings.map((booking) => ({
      ...booking,
      publicSpaceName: booking.publicSpace.name,
    }))
  }

  const getBookings = async () => {
    const bookings =
      await bookingRepository.getAllBookings()

    return bookings.map((booking) => ({
      ...booking,
      publicSpaceName: booking.publicSpace.name,
    }))
  }

  return {
    addBooking,
    deleteBooking,
    getBookingsByOwner,
    getBookings,
  }
}
