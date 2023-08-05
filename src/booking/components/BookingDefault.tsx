import React, { FC, useEffect, useState } from 'react'
import {
  BookingDTO,
  BookingVm,
} from '../interfaces/booking.interface'
import { useBookingViewController } from '../controllers/booking.view.controller'
import { DefaultContainerWithSearch } from '../../shared/components/DefaultContainerWithSearch/DefaultContainerWithSearch'
import { BookingList } from './BookingList'

type Props = {
  getBookings: () => Promise<BookingVm[]>
}
export const BookingDefault: FC<Props> = ({
  getBookings,
}) => {
  const [bookings, setBookings] = useState<BookingVm[]>([])
  const [allBookings, setAllBookings] = useState<
    BookingVm[]
  >([])

  const bookingViewController = useBookingViewController()

  useEffect(() => {

    getBookings().then((bookings) => {
      setAllBookings(bookings)
      setBookings(bookings)
    })
  }, [])

  const handleDeleteBooking = (booking: BookingDTO) => {
    bookingViewController
      .deleteBooking(booking)
      .then((successfully) => {
        if (successfully) {
          const newBookings = bookings.filter(
            (f) => f.id !== booking.id,
          )
          const newAllBookings = allBookings.filter(
            (f) => f.id !== booking.id,
          )

          setBookings(newBookings)
          setAllBookings(newAllBookings)
        }
      })
  }

  return (
    <DefaultContainerWithSearch
      title="Reservas"
      searchOptions={{
        allItems: allBookings,
        searchKeys: ['date', 'publicSpaceName'],
        setItems: setBookings,
      }}
    >
      <BookingList
        bookings={bookings}
        handleDeleteBooking={handleDeleteBooking}
      ></BookingList>
    </DefaultContainerWithSearch>
  )
}
