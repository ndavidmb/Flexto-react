import { IUserRequest } from '../../auth/interfaces/user.interface'
import { PublicSpaceBase } from '../../public-spaces/interfaces/public-space.interface'

export interface BookingDTO {
  publicSpace: PublicSpaceBase
  owner: IUserRequest
  startHour: number
  endHour: number
  date: string
  createAt: string
  id?: string
}

export interface BookingVm extends BookingDTO {
  publicSpaceName: string
}

export interface BookingWithId extends BookingDTO {
  id: string
}