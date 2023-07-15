import { BookingDTO } from '../../booking/interfaces/booking.interface'

export function getAvailableDates(
  currentPublicSpaceId: string,
  currentDate: string,
  bookings: BookingDTO[],
  availableHours: {
    startHours: [string, number][]
    endHours: [string, number][]
  },
) {
  const relevantBookings = bookings.filter(
    (booking) =>
      booking.publicSpace.id === currentPublicSpaceId &&
      booking.date === currentDate,
  )

  const available = availableHours.startHours.filter(
    ([_, hour]) =>
      !relevantBookings.some(
        (booking) =>
          hour >= booking.startHour &&
          hour < booking.endHour,
      ),
  )

  return available
}

export function getBookedDates(
  bookings: BookingDTO[],
  currentDate: string,
  currentPublicSpaceId: string,
) {
  let higherHour: BookingDTO | null = null
  let lowerHour: BookingDTO | null = null

  bookings
    .filter(
      (booking) =>
        booking.date === currentDate &&
        booking.publicSpace.id === currentPublicSpaceId,
    )
    .forEach((booking) => {
      if (
        higherHour === null ||
        booking.endHour > higherHour.endHour
      ) {
        higherHour = booking
      }

      if (
        lowerHour === null ||
        booking.startHour < lowerHour.startHour
      ) {
        lowerHour = booking
      }
    })

  return {
    latest: higherHour!.endHour,
    earliest: lowerHour!.startHour,
  }
}
