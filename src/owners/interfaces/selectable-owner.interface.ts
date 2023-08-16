import { Owner, OwnerWithApartment } from './owner.interface'

export interface SelectableOwner extends OwnerWithApartment {
  selected: boolean
}
