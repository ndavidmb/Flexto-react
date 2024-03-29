import { BasicOwner } from '../../owners/interfaces/owner.interface'
import { Apartment } from '../interfaces/apartment.interface'

export interface ApartmentWithOwner
  extends Apartment,
    BasicOwner {
  owner?: string
  hasOwner: boolean
}
