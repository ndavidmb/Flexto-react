import { Apartment } from '../../apartments/interfaces/apartment.interface'

export interface Owner {
  name: string
  phone: string
  apartment: Apartment
  email: string
}
