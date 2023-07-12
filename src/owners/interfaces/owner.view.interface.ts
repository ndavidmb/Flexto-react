import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { BookingDTO } from '../../booking/interfaces/booking.interface'
import { OwnerDTO } from './owner.interface'

export interface OwnerView {
  owner: OwnerDTO
  apartment: Apartment
  bookings: BookingDTO[]
}
