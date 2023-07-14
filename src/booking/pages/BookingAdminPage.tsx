import { BookingDefault } from '../components/BookingDefault'
import { useBookingViewController } from '../controllers/booking.view.controller'

export const BookingAdminPage = () => {
  const bookingViewController = useBookingViewController()

  return (
    <BookingDefault
      getBookings={bookingViewController.getAllBookings}
    />
  )
}
