import { where } from 'firebase/firestore/lite'
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

  const deleteBooking = async (bookingId: string) => {
    return await firestore.deleteFirestore(bookingId)
  }

  const getBookingsByOwner = async (uid: string) => {
    return await firestore.getAllFirestore([
      where('owner.uid', '==', uid),
    ])
  }

  return {
    addBooking,
    getAllBookings,
    getBookingsByOwner,
    deleteBooking,
  }
}
