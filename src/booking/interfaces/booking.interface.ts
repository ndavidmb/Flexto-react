import { IUserRequest } from '../../auth/interfaces/user.interface'
import { PublicSpaceBase } from '../../public-spaces/interfaces/public-space.interface'

export interface BookingDTO {
  publicSpace: PublicSpaceBase
  owner: IUserRequest
  startHour: number
  endHour: number
  date: string
}
