import { Owner } from '../../owners/interfaces/owner.interface'
import { PublicSpace } from '../../public-spaces/interfaces/public-space.interface'

export interface BookingDTO {
  publicSpace: PublicSpace
  owner: Owner
  startHour: number
  endHour: number
  date: string
}
