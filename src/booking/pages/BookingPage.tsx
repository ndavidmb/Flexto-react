import { useEffect } from 'react'
import { BookingDefault } from '../components/BookingDefault'
import { useBookingViewController } from '../controllers/booking.view.controller'

export const BookingPage = () => {
  const bookingViewController = useBookingViewController()

  return (
    <BookingDefault
      getBookings={bookingViewController.getBookingsByOwner}
    />
  )
}
