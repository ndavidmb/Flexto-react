import { FirestoreTable } from '../../shared/constants/firestore-tables'
import { useFirestore } from '../../shared/hooks/useFirestore'
import { BookingDTO } from '../interfaces/booking.interface'

export const useBookingRepository = () => {
  const firestore = useFirestore<BookingDTO>(
    FirestoreTable.BOOKING,
  )

  const addBooking = async (booking: BookingDTO) => {
    return await firestore.addFirestore(booking)
  }

  const getAllBookings = async () => {
    return await firestore.getAllFirestore()
  }

  return { addBooking, getAllBookings }
}
