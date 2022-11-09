import { Apartment } from '../../apartments/interfaces/apartment.interface'

export interface Owner {
  name: string
  phone: string
  email: string
  apartment: Apartment
  id?: string
}

export interface OwnerFromForm{
  name: string
  phone: string
  email: string
  apartmentId: string
}