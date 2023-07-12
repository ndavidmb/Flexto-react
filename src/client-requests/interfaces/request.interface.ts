import { IUserRequest } from '../../auth/interfaces/user.interface'
import { RequestType } from './client-request.interface'

export const enum RequestStates {
  PENDING = 'null',
  ACCEPTED = 'true',
  REJECTED = 'false',
}

export const REQUEST_STATES_DICT = {
  null: 'Pendiente',
  false: 'Rechazado',
  true: 'Aceptado',
}

export interface AdminRequest {
  type: RequestType
  description: string
  customization: string
  user: IUserRequest
  approved: RequestStates
  id?: string
  foreignId?: string
  dateDetail: {
    date: string
    endHour: number
    startHour: number
  }
  createdAt?: string
}

export interface AdminRequestVm extends AdminRequest {
  strType: string
  state: string
  email: string
  username: string
  phoneNumber: string
}

export interface ClientRequestDTO extends IUserRequest {
  description: string
  requestType: RequestType

  // Default void
  date: string
  startHour?: number
  endHour?: number

  // This could be foreign id to act or public space
  foreignId?: string
}
