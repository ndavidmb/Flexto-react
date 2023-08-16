import { Apartment } from '../../apartments/interfaces/apartment.interface'
import {
  IExtraUser,
  IUser,
} from '../../auth/interfaces/user.interface'
import { State } from '../../states/interfaces/state.interface'
export interface BasicOwner {
  name: string
  phone: string
  email: string
}

export interface Owner extends BasicOwner {
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

export interface OwnerDTO extends IUser, IExtraUser {
  deleted: boolean
}

export interface OwnerWithApartment extends OwnerDTO {
  apartment: Apartment
}

