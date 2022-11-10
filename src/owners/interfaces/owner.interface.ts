import { Apartment } from '../../apartments/interfaces/apartment.interface'
import { State } from '../../states/interfaces/state.interface'

export interface Owner {
  name: string
  phone: string
  email: string
  apartment: Apartment
  id?: string
}

export interface OwnerFromForm {
  name: string
  phone: string
  email: string
  apartmentId: string
}

export interface OwnerWithStates extends Owner {
  states: State[]
}
